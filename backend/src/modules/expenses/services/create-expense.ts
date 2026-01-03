import { CreateExpenseBody } from "../../../types/expenses.schemas";
import { expensesRepository } from "../expenses.repository";
import { categoriesRepository } from "../../categories/categories.repository";
import { NotFoundError } from "../../../errors/api-errors";

export const createExpenseService = async (
  userId: number,
  data: CreateExpenseBody
) => {
  if (data.categoryId) {
    const category = await categoriesRepository.findById(data.categoryId);
    if (!category) throw new NotFoundError("Category");
  }

  return await expensesRepository.create(userId, data);
};
