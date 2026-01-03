import { usersRepository } from "../users.repository";
import { NotFoundError } from "../../../errors/api-errors";

export const updateUserNameService = async (id: number, name: string) => {
  const user = await usersRepository.findUserById(id);
  if (!user) throw new NotFoundError("user");
  return await usersRepository.updateUserName(id, name);
};
