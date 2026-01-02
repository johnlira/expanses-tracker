import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../../../lib/prisma";
import { LoginBody } from "../../../types/auth.schemas";
import { UnauthorizedError } from "../../../errors/api-errors";
import { compare } from "bcryptjs";
import { server } from "../../../lib/fastify";

export const login = async (req: FastifyRequest, res: FastifyReply) => {
  const { email, password } = req.body as LoginBody;
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) throw new UnauthorizedError("Invalid credentials");
  const isPasswordValid = await compare(password, user.hashedPassword);
  if (!isPasswordValid) throw new UnauthorizedError("Invalid credentials");
  const token = await server.jwt.sign({ sub: user.id }, { expiresIn: "1h" });
  res.setCookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000, // 1 hour
  });
  return res.status(200).send({
    message: "User logged in successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      subscriptionType: user.subscriptionType,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
};
