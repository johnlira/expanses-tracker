import { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedError } from "../errors/api-errors";
import { server } from "../lib/fastify";
import { tokenService } from "../modules/auth/services/token";

export const authenticateMiddleware = async (
  req: FastifyRequest,
  res: FastifyReply
) => {
  const tokens: string[] = [];

  const cookieToken = req.cookies?.token;
  if (cookieToken) {
    if (Array.isArray(cookieToken)) {
      tokens.push(...cookieToken);
    } else {
      tokens.push(cookieToken);
    }
  }

  if (req.headers.cookie) {
    const cookieHeader = req.headers.cookie;
    const cookiePairs = cookieHeader.split(";").map((c) => c.trim());
    for (const pair of cookiePairs) {
      if (pair.startsWith("token=")) {
        const tokenValue = pair.split("=").slice(1).join("=");
        if (tokenValue && !tokens.includes(tokenValue)) {
          tokens.push(tokenValue);
        }
      }
    }
  }

  if (tokens.length === 0) {
    throw new UnauthorizedError("No token provided");
  }

  let validToken: string | null = null;
  const expiredTokens: string[] = [];

  for (const token of tokens) {
    if (tokenService.isTokenBlacklisted(token)) {
      continue;
    }

    try {
      const decoded = await server.jwt.verify(token);
      validToken = token;
      req.user = decoded as { sub: number };
      break;
    } catch (error) {
      expiredTokens.push(token);
    }
  }

  if (!validToken) {
    for (const expiredToken of expiredTokens) {
      res.clearCookie("token", {
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
    }
    throw new UnauthorizedError("Invalid or expired token");
  }

  if (expiredTokens.length > 0) {
    for (const expiredToken of expiredTokens) {
      res.clearCookie("token", {
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      });
    }
  }
};
