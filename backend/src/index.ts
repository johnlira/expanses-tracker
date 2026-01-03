import { env } from "./env";
import { buildServer } from "./lib/fastify";

let currentServer: Awaited<ReturnType<typeof buildServer>> | null = null;

const main = async () => {
  try {
    if (currentServer) {
      await currentServer.close();
    }

    const server = await buildServer();
    await server.listen({ port: env.PORT, host: env.HOST });
    currentServer = server;

    const shutdown = async (signal: string) => {
      server.log.info(`Received ${signal}, closing server...`);
      await server.close();
      process.exit(0);
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

main();
