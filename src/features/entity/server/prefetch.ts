import type { inferInput } from "@trpc/tanstack-react-query";
import { prefetch, trpc } from "@/trpc/server";

type PrefetchEntityInput = inferInput<typeof trpc.entities.getOne>;
type PrefetchEntitiesInput = inferInput<typeof trpc.entities.getMany>;

export async function prefetchEntity(input: PrefetchEntityInput) {
  return prefetch(trpc.entities.getOne.queryOptions(input));
}

export async function prefetchEntities(input: PrefetchEntitiesInput) {
  return prefetch(trpc.entities.getMany.queryOptions(input));
}
