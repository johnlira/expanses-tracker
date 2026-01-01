import { env } from "./env";
import { buildServer, server } from "./lib/fastify";

export const main = async () => {
  try {
    const server = await buildServer();
    await server.listen({ port: env.PORT, host: env.HOST });
  } catch (error) {
    server.log.error(error, "Error starting server");
    process.exit(1);
  }
};

main();
