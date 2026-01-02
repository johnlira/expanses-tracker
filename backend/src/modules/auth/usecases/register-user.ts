import { prisma } from "../../../lib/prisma";
import { FastifyRequest, FastifyReply } from "fastify";
import { RegisterUserBody } from "../../../types/auth.schemas";
import { hash } from "bcryptjs";
import { AppError } from "../../../errors/api-errors";
import { server } from "../../../lib/fastify";

export const registerUser = async (req: FastifyRequest, res: FastifyReply) => {
  const { name, email, password } = req.body as RegisterUserBody;
  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) throw new AppError("Failed to register user");
  const token = await server.jwt.sign({ sub: user.id }, { expiresIn: "1h" });
  res.setCookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 60 * 60 * 1000, // 1 hour
  });
  return res.status(201).send({
    message: "User registered successfully",
    user,
  });
};
