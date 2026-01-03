import { hash } from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { RegisterUserBody } from "../../types/auth.schemas";

export const authRepository = {
  findUserByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },
  findUserById: async (id: number) => {
    return await prisma.user.findUnique({
      where: { id },
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
  createUser: async (body: RegisterUserBody) => {
    return await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        hashedPassword: await hash(body.password, 10),
        subscriptionType: "FREE",
      },
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
