import { FastifyReply, FastifyRequest } from "fastify";
export const logout = async (req: FastifyRequest, res: FastifyReply) => {
  res.clearCookie("token");
  return res.status(200).send({
    message: "User logged out successfully",
  });
};
