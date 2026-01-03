import { prisma } from "../../lib/prisma";

export const usersRepository = {
  findUserById: async (id: number) => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },
  updateUserName: async (id: number, name: string) => {
    return await prisma.user.update({
      where: { id },
      data: { name, updatedAt: new Date() },
      select: {
        id: true,
        name: true,
        email: true,
        subscriptionType: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },
};
