import { RegisterUserBody } from "../../../types/auth.schemas";
import { ConflictError } from "../../../errors/api-errors";
import { authRepository } from "../auth.repository";

export const registerUserService = async (body: RegisterUserBody) => {
  const existingUser = await authRepository.findUserByEmail(body.email);
  if (existingUser) throw new ConflictError("Email");
  const user = await authRepository.createUser(body);
  return user;
};
