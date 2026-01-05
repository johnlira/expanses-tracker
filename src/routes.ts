import { FastifyInstance } from "fastify";
import { authRoutes } from "./modules/auth/auth.routes";
import { usersRoutes } from "./modules/users/users.routes";
import { categoriesRoutes } from "./modules/categories/categories.routes";
import { expensesRoutes } from "./modules/expenses/expenses.routes";

export const routes = async (server: FastifyInstance) => {
  await server.register(authRoutes, { prefix: "/api/v1/auth" });
  await server.register(usersRoutes, { prefix: "/api/v1/users" });
  await server.register(categoriesRoutes, { prefix: "/api/v1/categories" });
  await server.register(expensesRoutes, { prefix: "/api/v1/expenses" });
  server.get("/health", async (request, reply) => {
    return reply.send({
      status: "ok",
    });
  });
};
