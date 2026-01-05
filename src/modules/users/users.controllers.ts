import { FastifyReply, FastifyRequest } from "fastify";
import { updateUserNameService } from "./services/update-user-name";
import { updateUserSubscriptionService } from "./services/update-user-subscription";
import { SubscriptionType } from "../../generated/prisma/client";

export const usersControllers = {
  updateUserName: async (req: FastifyRequest, res: FastifyReply) => {
    const userId = (req.user as { sub: number }).sub;
    const { name } = req.body as { name: string };
    const user = await updateUserNameService(userId, name);
    return res.status(200).send({
      message: "User name updated successfully",
      user,
    });
  },
  updateUserSubscription: async (req: FastifyRequest, res: FastifyReply) => {
    const userId = (req.user as { sub: number }).sub;
    const { subscriptionType } = req.body as {
      subscriptionType: SubscriptionType;
    };
    const user = await updateUserSubscriptionService(userId, subscriptionType);
    return res.status(200).send({
      message: "User subscription updated successfully",
      user,
    });
  },
};
