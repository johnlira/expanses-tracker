import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.coerce.number("PORT is required").default(3000),
  HOST: z.string("HOST is required").default("localhost"),
  JWT_SECRET: z.string("JWT_SECRET is required").min(1),
  DATABASE_URL: z.string("DATABASE_URL is required").min(1),
});

export const env = envSchema.parse(process.env);
