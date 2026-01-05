import { UpdateExpenseBody } from "../../../types/expenses.schemas";
import { expensesRepository } from "../expenses.repository";
import { categoriesRepository } from "../../categories/categories.repository";
import { NotFoundError } from "../../../errors/api-errors";

export const updateExpenseService = async (
  id: number,
  userId: number,
  data: UpdateExpenseBody
) => {
  const expense = await expensesRepository.findById(id, userId);
  if (!expense) throw new NotFoundError("Expense");

  if (data.categoryId !== undefined && data.categoryId !== null) {
    const category = await categoriesRepository.findById(data.categoryId);
    if (!category) throw new NotFoundError("Category");
  }

  return await expensesRepository.update(id, userId, data);
};
