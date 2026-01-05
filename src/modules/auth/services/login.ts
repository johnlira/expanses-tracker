import { LoginBody } from "../../../types/auth.schemas";
import { UnauthorizedError } from "../../../errors/api-errors";
import { compare } from "bcryptjs";
import { authRepository } from "../auth.repository";

export const loginService = async (body: LoginBody) => {
  const user = await authRepository.findUserByEmail(body.email);
  if (!user) throw new UnauthorizedError("Invalid credentials");
  const isPasswordValid = await compare(body.password, user.hashedPassword);
  if (!isPasswordValid) throw new UnauthorizedError("Invalid credentials");
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    subscriptionType: user.subscriptionType,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
