import { FastifyInstance } from "fastify";
import { authenticateMiddleware } from "../../middlewares/authenticate";
import { expensesControllers } from "./expenses.controllers";
import {
  createExpenseBodySchema,
  updateExpenseBodySchema,
  listExpensesQuerySchema,
  expenseResponseSchema,
} from "../../types/expenses.schemas";
import z from "zod";

export const expensesRoutes = async (server: FastifyInstance) => {
  // Create expense | PRIVATE (POST /api/v1/expenses)
  server.post(
    "/",
    {
      schema: {
        tags: ["expenses"],
        summary: "Create expense",
        description: "Create a new expense",
        operationId: "createExpense",
        body: createExpenseBodySchema,
        response: {
          201: z.object({
            message: z.string(),
            expense: expenseResponseSchema,
          }),
        },
      },
      preHandler: [authenticateMiddleware],
    },
    expensesControllers.createExpense
  );

  // List expenses | PRIVATE (GET /api/v1/expenses)
  server.get(
    "/",
    {
      schema: {
        tags: ["expenses"],
        summary: "List expenses",
        description: "List all expenses with filters and pagination",
        operationId: "listExpenses",
        querystring: listExpensesQuerySchema,
        response: {
          200: z.object({
            message: z.string(),
            expenses: z.array(expenseResponseSchema),
            total: z.number(),
            page: z.number(),
            limit: z.number(),
            totalPages: z.number(),
          }),
        },
      },
      preHandler: [authenticateMiddleware],
    },
    expensesControllers.listExpenses
  );

  // Get expense by ID | PRIVATE (GET /api/v1/expenses/:id)
  server.get(
    "/:id",
    {
      schema: {
        tags: ["expenses"],
        summary: "Get expense by ID",
        description: "Get a specific expense by its ID",
        operationId: "getExpenseById",
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: z.object({
            message: z.string(),
            expense: expenseResponseSchema,
          }),
        },
      },
      preHandler: [authenticateMiddleware],
    },
    expensesControllers.getExpenseById
  );

  // Update expense | PRIVATE (PATCH /api/v1/expenses/:id)
  server.patch(
    "/:id",
    {
      schema: {
        tags: ["expenses"],
        summary: "Update expense",
        description: "Update a specific expense by its ID",
        operationId: "updateExpense",
        params: z.object({
          id: z.coerce.number(),
        }),
        body: updateExpenseBodySchema,
        response: {
          200: z.object({
            message: z.string(),
            expense: expenseResponseSchema,
          }),
        },
      },
      preHandler: [authenticateMiddleware],
    },
    expensesControllers.updateExpense
  );

  // Delete expense | PRIVATE (DELETE /api/v1/expenses/:id)
  server.delete(
    "/:id",
    {
      schema: {
        tags: ["expenses"],
        summary: "Delete expense",
        description: "Delete a specific expense by its ID",
        operationId: "deleteExpense",
        params: z.object({
          id: z.coerce.number(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
      preHandler: [authenticateMiddleware],
    },
    expensesControllers.deleteExpense
  );
};

