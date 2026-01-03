import { FastifyRequest, FastifyReply } from "fastify";
import { createExpenseService } from "./services/create-expense";
import { listExpensesService } from "./services/list-expenses";
import { getExpenseByIdService } from "./services/get-expense-by-id";
import { updateExpenseService } from "./services/update-expense";
import { deleteExpenseService } from "./services/delete-expense";
import {
  CreateExpenseBody,
  UpdateExpenseBody,
  ListExpensesQuery,
} from "../../types/expenses.schemas";

export const expensesControllers = {
  createExpense: async (req: FastifyRequest, res: FastifyReply) => {
    const userId = (req.user as { sub: number }).sub;
    const body = req.body as CreateExpenseBody;
    const expense = await createExpenseService(userId, body);
    return res.status(201).send({
      message: "Expense created successfully",
      expense,
    });
  },

  listExpenses: async (req: FastifyRequest, res: FastifyReply) => {
    const userId = (req.user as { sub: number }).sub;
    const query = req.query as ListExpensesQuery;
    const result = await listExpensesService(userId, query);
    return res.status(200).send({
      message: "Expenses retrieved successfully",
      ...result,
    });
  },

  getExpenseById: async (req: FastifyRequest, res: FastifyReply) => {
    const userId = (req.user as { sub: number }).sub;
    const { id } = req.params as { id: string };
    const expense = await getExpenseByIdService(Number(id), userId);
    return res.status(200).send({
      message: "Expense retrieved successfully",
      expense,
    });
  },

  updateExpense: async (req: FastifyRequest, res: FastifyReply) => {
    const userId = (req.user as { sub: number }).sub;
    const { id } = req.params as { id: string };
    const body = req.body as UpdateExpenseBody;
    const expense = await updateExpenseService(Number(id), userId, body);
    return res.status(200).send({
      message: "Expense updated successfully",
      expense,
    });
  },

  deleteExpense: async (req: FastifyRequest, res: FastifyReply) => {
    const userId = (req.user as { sub: number }).sub;
    const { id } = req.params as { id: string };
    await deleteExpenseService(Number(id), userId);
    return res.status(200).send({
      message: "Expense deleted successfully",
    });
  },
};
