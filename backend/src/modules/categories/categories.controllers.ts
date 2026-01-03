import { FastifyRequest, FastifyReply } from "fastify";
import { listCategoriesService } from "./services/list-categories";
import { getCategoryByIdService } from "./services/get-category-by-id";

export const categoriesControllers = {
  listCategories: async (req: FastifyRequest, res: FastifyReply) => {
    const categories = await listCategoriesService();
    return res.status(200).send({
      message: "Categories retrieved successfully",
      categories,
    });
  },
  getCategoryById: async (req: FastifyRequest, res: FastifyReply) => {
    const { id } = req.params as { id: string };
    const category = await getCategoryByIdService(Number(id));
    return res.status(200).send({
      message: "Category retrieved successfully",
      category,
    });
  },
};

