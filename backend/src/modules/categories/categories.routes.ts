import { FastifyInstance } from "fastify";
import { authenticateMiddleware } from "../../middlewares/authenticate";
import { categoriesControllers } from "./categories.controllers";
import {
  categoryResponseSchema,
  categoriesResponseSchema,
} from "../../types/categories.schemas";
import z from "zod";

export const categoriesRoutes = async (server: FastifyInstance) => {
  // List all categories | PRIVATE (GET /api/v1/categories)
  server.get(
    "/",
    {
      schema: {
        tags: ["categories"],
        summary: "List all categories",
        description: "List all categories",
        operationId: "listCategories",
        response: {
          200: z.object({
            message: z.string(),
            categories: categoriesResponseSchema,
          }),
        },
      },
      preHandler: [authenticateMiddleware],
    },
    categoriesControllers.listCategories
  );

  // Get category by ID | PRIVATE (GET /api/v1/categories/:id)
  server.get(
    "/:id",
    {
      schema: {
        tags: ["categories"],
        summary: "Get category by ID",
        description: "Get a specific category by its ID",
        operationId: "getCategoryById",
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: z.object({
            message: z.string(),
            category: categoryResponseSchema,
          }),
        },
      },
      preHandler: [authenticateMiddleware],
    },
    categoriesControllers.getCategoryById
  );
};
