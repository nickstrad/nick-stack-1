import { PAGINATION } from "@/lib/constants";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import prisma from "@/lib/db";
import z from "zod";

const entityInputSchema = z.object({
  name: z.string().default(""),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  description: z.string().default(""),
  amazonUrl: z
    .string()
    .url("Must be a valid URL")
    .min(1, "Amazon URL is required"),
  imageUrls: z.array(z.string().url("Must be a valid URL")).default([]),
});

export const entitiesRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
      })
    )
    .query(async ({ input }) => {
      const { page, pageSize, search } = input;
      const skip = (page - 1) * pageSize;

      const where = search
        ? {
            OR: [
              { name: { contains: search, mode: "insensitive" as const } },
              { brand: { contains: search, mode: "insensitive" as const } },
              { model: { contains: search, mode: "insensitive" as const } },
              {
                description: { contains: search, mode: "insensitive" as const },
              },
            ],
          }
        : {};

      const [entities, total] = await Promise.all([
        prisma.entities.findMany({
          where,
          skip,
          take: pageSize,
          orderBy: { createdAt: "desc" },
        }),
        prisma.entities.count({ where }),
      ]);

      return {
        entities,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      };
    }),

  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;

      const entity = await prisma.entities.findUnique({
        where: { id },
      });

      if (!entity) {
        throw new Error("entity not found");
      }

      return entity;
    }),

  create: baseProcedure.input(entityInputSchema).mutation(async ({ input }) => {
    const entity = await prisma.entities.create({
      data: input,
    });

    return entity;
  }),

  update: baseProcedure
    .input(
      entityInputSchema.extend({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;

      const entity = await prisma.entities.update({
        where: { id },
        data,
      });

      return entity;
    }),

  remove: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { id } = input;

      const entity = await prisma.entities.delete({
        where: { id },
      });

      return entity;
    }),
});
