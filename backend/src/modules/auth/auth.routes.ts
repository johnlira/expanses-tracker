import { FastifyInstance } from "fastify";
import { registerUser } from "./usecases/register-user";
import {
  loginBodySchema,
  registerUserBodySchema,
  userResponseSchema,
} from "../../types/auth.schemas";
import { me } from "./usecases/me";
import { authenticateMiddleware } from "../../middlewares/authenticate";
import { logout } from "./usecases/logout";
import z from "zod";
import { login } from "./usecases/login";

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
    registerUser
  );
  // Verify a user | PRIVATE (GET /api/auth/verify)
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
    me
  );
  // Logout a user | PRIVATE (POST /api/auth/logout)
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
      preHandler: [authenticateMiddleware],
    },
    logout
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
    login
  );
};
