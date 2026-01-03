import { FastifyReply, FastifyRequest } from "fastify";
import { updateUserNameService } from "./services/update-user-name";

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
};
