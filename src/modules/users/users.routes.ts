import { FastifyInstance } from "fastify";
import { authenticateMiddleware } from "../../middlewares/authenticate";
import { usersControllers } from "./users.controllers";
import { userResponseSchema } from "../../types/auth.schemas";
import z from "zod";

export const usersRoutes = async (server: FastifyInstance) => {
  server.patch(
    "/name",
    {
      schema: {
        tags: ["users"],
        summary: "Update user name",
        description: "Update user name",
        operationId: "updateUserName",
        body: z.object({
          name: z.string().min(1, "Name is required"),
        }),
        response: {
          200: z.object({
            message: z.string(),
            user: userResponseSchema,
          }),
        },
      },
      preHandler: [authenticateMiddleware],
    },
    usersControllers.updateUserName
  );
  server.patch(
    "/subscription",
    {
      schema: {
        tags: ["users"],
        summary: "Update user subscription",
        description: "Update user subscription",
        operationId: "updateUserSubscription",
        body: z.object({
          subscriptionType: z.enum(["FREE", "PREMIUM"]),
        }),
        response: {
          200: z.object({
            message: z.string(),
            user: userResponseSchema,
          }),
        },
      },
      preHandler: [authenticateMiddleware],
    },
    usersControllers.updateUserSubscription
  );
};
