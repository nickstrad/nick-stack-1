import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export const EntitiesListError = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Alert variant="destructive">
      <AlertCircle />
      <AlertTitle>Error Loading Entities</AlertTitle>
      <AlertDescription>
        <p className="mb-4">
          Failed to load the entities list. Please try again.
        </p>
        <Button variant="outline" size="sm" onClick={handleReload}>
          Reload Page
        </Button>
      </AlertDescription>
    </Alert>
  );
};
