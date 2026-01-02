"use client";

import { EntityForm } from "./entity-form";
import { useSuspenseEntity } from "../hooks/use-entities";
import { useRouter } from "next/navigation";
import { STATIC_PATHS } from "@/lib/constants";
import type { Entity } from "@/generated/prisma/client";

type EntityEditorProps = {
  entityId: string;
};

export const EntityEditor = ({ entityId }: EntityEditorProps) => {
  const { data } = useSuspenseEntity({ id: entityId });
  const entity = data as Entity;
  const router = useRouter();

  const handleSuccess = () => {
    router.push(STATIC_PATHS.ENTITIES);
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Entity</h1>
        <p className="text-muted-foreground mt-2">Update Entity information</p>
      </div>
      <EntityForm entity={entity} onSuccess={handleSuccess} />
    </div>
  );
};
