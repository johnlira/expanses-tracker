import { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "./api-errors";
import { hasZodFastifySchemaValidationErrors } from "fastify-type-provider-zod";

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (hasZodFastifySchemaValidationErrors(error)) {
    reply.status(400).send({
      statusCode: 400,
      error: "VALIDATION_ERROR",
      message: "Validation failed",
      issues: error.validation.map((issue) => issue.message),
    });
    return;
  }
  if (error instanceof AppError) {
    reply.status(error.statusCode).send({
      statusCode: error.statusCode,
      error: error.code,
      message: error.message,
    });
    return;
  }
  console.error("Unhandled error:", error);
  reply.status(500).send({
    statusCode: 500,
    error: "INTERNAL_SERVER_ERROR",
    message: "An unexpected error occurred",
  });
}
