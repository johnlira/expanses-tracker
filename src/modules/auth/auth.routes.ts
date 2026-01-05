import { FastifyInstance } from "fastify";
import {
  loginBodySchema,
  registerUserBodySchema,
  userResponseSchema,
} from "../../types/auth.schemas";
import { authenticateMiddleware } from "../../middlewares/authenticate";
import z from "zod";
import { authControllers } from "./auth.controllers";

export const authRoutes = async (server: FastifyInstance) => {
  // Register a new user | PUBLIC (POST /api/auth/register)
  server.post(
    "/register",
    {
      schema: {
        tags: ["auth"],
        summary: "Register a new user",
        description: "Register a new user",
        operationId: "registerUser",
        parameters: [
          {
            name: "name",
            in: "body",
            required: true,
            schema: registerUserBodySchema,
          },
        ],
        body: registerUserBodySchema,
        response: {
          201: z.object({
            message: z.string(),
            user: userResponseSchema,
          }),
        },
      },
    },
    authControllers.registerUser
  );
  // Verify a user | PRIVATE (GET /api/auth/me)
  server.get(
    "/me",
    {
      schema: {
        tags: ["auth"],
        summary: "Get the current user",
        description: "Get the current user",
        operationId: "me",
        response: {
          200: z.object({
            message: z.string(),
            user: userResponseSchema,
          }),
        },
      },
      preHandler: [authenticateMiddleware],
    },
    authControllers.me
  );
  // Logout a user | PUBLIC (POST /api/auth/logout)
  server.post(
    "/logout",
    {
      schema: {
        tags: ["auth"],
        summary: "Logout a user",
        description: "Logout a user",
        operationId: "logout",
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    authControllers.logout
  );
  // Login a user | PUBLIC (POST /api/auth/login)
  server.post(
    "/login",
    {
      schema: {
        tags: ["auth"],
        summary: "Login a user",
        description: "Login a user",
        operationId: "login",
        body: loginBodySchema,
        response: {
          200: z.object({
            message: z.string(),
            user: userResponseSchema,
          }),
        },
      },
    },
    authControllers.login
  );
};
