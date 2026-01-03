import { FastifyInstance } from "fastify";
import { authRoutes } from "./modules/auth/auth.routes";
import { usersRoutes } from "./modules/users/users.routes";

export const routes = async (server: FastifyInstance) => {
  await server.register(authRoutes, { prefix: "/api/v1/auth" });
  await server.register(usersRoutes, { prefix: "/api/v1/users" });
  server.get("/health", async (request, reply) => {
    return reply.send({
      status: "ok",
    });
  });
};
