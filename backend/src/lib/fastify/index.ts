import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "../../env";
import { errorHandler } from "../../errors/error-handler";
import { registerPlugins } from "./plugins";

export const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname",
        colorize: true,
        singleLine: true,
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);
server.setErrorHandler(errorHandler);

export const buildServer = async () => {
  try {
    server.log.info(`Server is starting on ${env.HOST}:${env.PORT}`);
    await registerPlugins(server);
    await server.ready();
    return server;
  } catch (error) {
    server.log.error(error, "Error building Fastify app");
    throw error;
  }
};
