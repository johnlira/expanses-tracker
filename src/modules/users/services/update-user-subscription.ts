import { SubscriptionType } from "../../../generated/prisma/client";
import { NotFoundError } from "../../../errors/api-errors";
import { usersRepository } from "../users.repository";

export const updateUserSubscriptionService = async (
  id: number,
  subscriptionType: SubscriptionType
) => {
  const user = await usersRepository.findUserById(id);
  if (!user) throw new NotFoundError("user");
  return await usersRepository.updateUserSubscriptionType(id, subscriptionType);
};
