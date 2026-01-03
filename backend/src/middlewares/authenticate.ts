import { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedError } from "../errors/api-errors";
import { server } from "../lib/fastify";
import { tokenService } from "../modules/auth/services/token";

export const authenticateMiddleware = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const token = req.cookies?.token;
  if (!token) throw new UnauthorizedError();

  if (tokenService.isTokenBlacklisted(token)) {
    throw new UnauthorizedError();
  }

  try {
    const decoded = await server.jwt.verify(token);
    req.user = decoded as { sub: number };
  } catch (error) {
    throw new UnauthorizedError();
  }
};
