import { NotFoundError } from "../../../errors/api-errors";
import { expensesRepository } from "../expenses.repository";

export const deleteExpenseService = async (id: number, userId: number) => {
  const expense = await expensesRepository.findById(id, userId);
  if (!expense) throw new NotFoundError("Expense");

  await expensesRepository.delete(id, userId);
};
