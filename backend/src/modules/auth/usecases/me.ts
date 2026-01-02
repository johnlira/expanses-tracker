import { FastifyReply, FastifyRequest } from "fastify";
import { NotFoundError } from "../../../errors/api-errors";
import { prisma } from "../../../lib/prisma";

export const me = async (req: FastifyRequest, res: FastifyReply) => {
  const user = await prisma.user.findUnique({
    where: {
      id: (req.user as { sub: number }).sub,
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
  if (!user) throw new NotFoundError("user");
  return res.status(200).send({
    message: "User verified successfully",
    user,
  });
};
