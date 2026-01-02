"use client";

import { EntityForm } from "@/features/entity/components/entity-form";
import { useRouter } from "next/navigation";
import { STATIC_PATHS } from "@/lib/constants";

export default function CreateEntityPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push(STATIC_PATHS.ENTITIES);
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Entity</h1>
        <p className="text-muted-foreground mt-2">Add a new entity</p>
      </div>
      <EntityForm onSuccess={handleSuccess} />
    </div>
  );
}
