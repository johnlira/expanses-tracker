import { FastifyInstance } from "fastify";

export const routes = async (server: FastifyInstance) => {
  server.get("/health", async (request, reply) => {
    return reply.send({
      status: "ok",
    });
  });
};
