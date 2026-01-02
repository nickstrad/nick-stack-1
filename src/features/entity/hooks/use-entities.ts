import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { ENTITIES_PARAMS } from "../params";
import { useQueryStates } from "nuqs";

export const useSuspenseEntities = () => {
  const trpc = useTRPC();
  const [params] = useEntitiesParams();

  return useSuspenseQuery(trpc.entities.getMany.queryOptions(params));
};

export const useSuspenseEntity = ({ id }: { id: string }) => {
  const trpc = useTRPC();

  return useSuspenseQuery(trpc.entities.getOne.queryOptions({ id }));
};

export const useEntitiesParams = () => {
  return useQueryStates(ENTITIES_PARAMS);
};

export const useCreateEntity = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.entities.create.mutationOptions({
      onSuccess: async (data) => {
        toast.success(`Entity "${data.name}" created`);
        // Invalidate all getMany queries regardless of params
        queryClient.invalidateQueries({
          queryKey: [["entities", "getMany"]],
        });
      },
      onError: (error) => {
        toast.error(`Failed to create entity: ${error.message}`);
      },
    })
  );
};

export const useUpdateEntity = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  return useMutation(
    trpc.entities.update.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Entity "${data.name}" updated`);
        // Invalidate all getMany queries regardless of params
        queryClient.invalidateQueries({
          queryKey: [["entities", "getMany"]],
        });
        queryClient.invalidateQueries({
          queryKey: [["entities", "getOne"], { input: { id: data.id } }],
        });
      },
      onError: (error) => {
        toast.error(`Failed to update entity: ${error.message}`);
      },
    })
  );
};

export const useRemoveEntity = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.entities.remove.mutationOptions({
      onSuccess: async (data) => {
        toast.success(`Entity "${data.name}" deleted`);
        // Invalidate all getMany queries regardless of params
        queryClient.invalidateQueries({
          queryKey: [["entities", "getMany"]],
        });
        queryClient.invalidateQueries({
          queryKey: [["entities", "getOne"], { input: { id: data.id } }],
        });
      },
      onError: (error) => {
        toast.error(`Failed to delete entity: ${error.message}`);
      },
    })
  );
};
