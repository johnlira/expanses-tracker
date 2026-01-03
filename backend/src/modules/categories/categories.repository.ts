import { prisma } from "../../lib/prisma";

export const categoriesRepository = {
  findAll: async () => {
    return await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
  },
  findById: async (id: number) => {
    return await prisma.category.findUnique({
      where: { id },
    });
  },
};

