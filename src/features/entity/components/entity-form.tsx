"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useCreateEntity, useUpdateEntity } from "../hooks/use-entities";
import { useEffect } from "react";
import { Entity } from "@/generated/prisma/client";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
});

export type FormValues = z.infer<typeof formSchema>;

type EntityFormProps = {
  entity?: Entity;
  onSuccess?: () => void;
};

export const EntityForm = ({ entity, onSuccess }: EntityFormProps) => {
  const isEditing = !!entity && !!entity.id;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: entity?.name ?? "",
      description: entity?.description ?? "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "imageUrls",
  });

  const createMutation = useCreateEntity();
  const updateMutation = useUpdateEntity();

  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (entity) {
      form.reset({
        name: entity.name,
        description: entity.description,
      });
    }
  }, [entity, form]);

  const onSubmit = (data: FormValues) => {
    const payload = {
      name: data.name,
      description: data.description,
    };

    if (isEditing) {
      updateMutation.mutate(
        { id: entity.id, ...payload },
        {
          onSuccess: () => {
            onSuccess?.();
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          form.reset();
          onSuccess?.();
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g., Entity Name"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Detailed description of the entity..."
                  disabled={isPending}
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" disabled={isPending} variant="outline">
            {isPending
              ? "Saving..."
              : isEditing
              ? "Update Entity"
              : "Create Entity"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
