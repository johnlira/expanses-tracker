import { FastifyInstance } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import scalarApiReference from "@scalar/fastify-api-reference";
import fastifyJwt from "@fastify/jwt";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import { env } from "../../env";
import fastifyCookie from "@fastify/cookie";
import { routes } from "../../routes";

export const registerPlugins = async (server: FastifyInstance) => {
  await server.register(fastifyCors, {
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "http://127.0.0.1:3000",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  });
  await server.register(fastifyCookie, {
    secret: env.JWT_SECRET,
    parseOptions: {},
  });
  await server.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });
  await server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Expenses Tracker API",
        description: "API for expenses tracking",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });
  await server.register(routes);
  await server.register(scalarApiReference as any, {
    routePrefix: "/docs",
    configuration: {
      title: "Expenses Tracker API",
      version: "1.0.0",
      description: "API for expenses tracking",
      theme: "elysiajs",
    },
  });
};
