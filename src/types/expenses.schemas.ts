import { z } from "zod";

export const createExpenseBodySchema = z.object({
  amount: z.number().int().positive("Amount must be positive"),
  date: z.coerce.date(),
  description: z.string().optional(),
  categoryId: z.number().int().positive().optional(),
  type: z.enum(["INCOME", "EXPENSE"]),
  paymentMethod: z.enum(["CREDIT_CARD", "DEBIT_CARD", "PIX", "CASH"]),
});

export type CreateExpenseBody = z.infer<typeof createExpenseBodySchema>;

export const updateExpenseBodySchema = z.object({
  amount: z.number().int().positive("Amount must be positive").optional(),
  date: z.coerce.date().optional(),
  description: z.string().optional(),
  categoryId: z.number().int().positive().optional().nullable(),
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
  paymentMethod: z.enum(["CREDIT_CARD", "DEBIT_CARD", "PIX", "CASH"]).optional(),
});

export type UpdateExpenseBody = z.infer<typeof updateExpenseBodySchema>;

export const listExpensesQuerySchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  categoryId: z.coerce.number().int().positive().optional(),
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().min(1).max(100).default(10),
});

export type ListExpensesQuery = z.infer<typeof listExpensesQuerySchema>;

export const expenseResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  amount: z.number(),
  date: z.coerce.date(),
  description: z.string().nullable(),
  categoryId: z.number().nullable(),
  type: z.enum(["INCOME", "EXPENSE"]),
  paymentMethod: z.enum(["CREDIT_CARD", "DEBIT_CARD", "PIX", "CASH"]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  user: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
  }).optional(),
  category: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string().nullable(),
    icon: z.string().nullable(),
    color: z.string().nullable(),
  }).nullable().optional(),
});

export type ExpenseResponse = z.infer<typeof expenseResponseSchema>;

export const expensesResponseSchema = z.array(expenseResponseSchema);

export const paginatedExpensesResponseSchema = z.object({
  expenses: expensesResponseSchema,
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

export type PaginatedExpensesResponse = z.infer<typeof paginatedExpensesResponseSchema>;

