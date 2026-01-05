import { ListExpensesQuery } from "../../../types/expenses.schemas";
import { expensesRepository } from "../expenses.repository";

export const listExpensesService = async (
  userId: number,
  query: ListExpensesQuery
) => {
  const filters = {
    startDate: query.startDate,
    endDate: query.endDate,
    categoryId: query.categoryId,
    type: query.type,
  };

  const pagination = {
    page: query.page || 1,
    limit: query.limit || 10,
  };

  return await expensesRepository.findMany(userId, filters, pagination);
};

