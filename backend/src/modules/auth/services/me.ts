import { NotFoundError } from "../../../errors/api-errors";
import { authRepository } from "../auth.repository";

export const meService = async (userId: number) => {
  const user = await authRepository.findUserById(userId);
  if (!user) throw new NotFoundError("user");
  return user;
};
