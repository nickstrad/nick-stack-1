import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PATH_BUILDERS } from "@/lib/constants";
import { EntitiesList } from "@/features/entity/components/entity-list";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { SearchParams } from "nuqs/server";
import { entitiesParamsLoader } from "@/features/entity/server/params";
import { prefetchEntities } from "@/features/entity/server/prefetch";
import { EntitiesListLoading } from "@/features/entity/components/entity-list-loading";
import { EntitiesListError } from "@/features/entity/components/enity-list-error";

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function EntitiesPage({ searchParams }: Props) {
  const params = await entitiesParamsLoader(searchParams);
  prefetchEntities(params);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Entities</h1>
          <p className="text-muted-foreground mt-2">Manage your entities</p>
        </div>
        <div className="flex gap-2">
          <Link href={PATH_BUILDERS.ENTITIES.create}>
            <Button variant="outline">Create New Entity</Button>
          </Link>
        </div>
      </div>

      <HydrateClient>
        <ErrorBoundary fallback={<EntitiesListError />}>
          <Suspense fallback={<EntitiesListLoading />}>
            <EntitiesList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </div>
  );
}
