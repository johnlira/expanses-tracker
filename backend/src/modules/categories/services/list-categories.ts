import { categoriesRepository } from "../categories.repository";

export const listCategoriesService = async () => {
  const categories = await categoriesRepository.findAll();
  return categories;
};

