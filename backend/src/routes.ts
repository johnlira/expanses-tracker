import { FastifyInstance } from "fastify";
import { authRoutes } from "./modules/auth/auth.routes";

export const routes = async (server: FastifyInstance) => {
  await authRoutes(server);
  server.get("/health", async (request, reply) => {
    return reply.send({
      status: "ok",
    });
  });
};
