import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { STATIC_PATHS } from "@/lib/constants";

type EntityErrorProps = {
  entityId?: string;
};

export const EntityError = ({ entityId }: EntityErrorProps) => {
  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>Error Loading Entity</AlertTitle>
        <AlertDescription>
          <p className="mb-4">
            {entityId
              ? `Failed to load entity with ID: ${entityId}`
              : "Failed to load entity data"}
          </p>
          <Link href={STATIC_PATHS.ENTITIES}>
            <Button variant="outline" size="sm">
              Back to Entities
            </Button>
          </Link>
        </AlertDescription>
      </Alert>
    </div>
  );
};
