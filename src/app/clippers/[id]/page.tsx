import { EntityEditor } from "@/features/entity/components/entity-editor";
import { EntityError } from "@/features/entity/components/entity-error";
import { EntityLoading } from "@/features/entity/components/entity-loading";
import { prefetchEntity } from "@/features/entity/server/prefetch";
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;

  prefetchEntity({ id });

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<EntityError entityId={id} />}>
        <Suspense fallback={<EntityLoading />}>
          <EntityEditor entityId={id} />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  );
};

export default Page;
