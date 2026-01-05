import { NotFoundError } from "../../../errors/api-errors";
import { categoriesRepository } from "../categories.repository";

export const getCategoryByIdService = async (id: number) => {
  const category = await categoriesRepository.findById(id);
  if (!category) throw new NotFoundError("category");
  return category;
};

