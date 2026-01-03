import { z } from "zod";

export const categoryResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  color: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type CategoryResponse = z.infer<typeof categoryResponseSchema>;

export const categoriesResponseSchema = z.array(categoryResponseSchema);

