import { FastifyReply } from "fastify";
import { server } from "../../../lib/fastify";

const tokenBlacklist = new Set<string>();

export const tokenService = {
  generateToken: async (userId: number) => {
    return await server.jwt.sign({ sub: userId }, { expiresIn: "1h" });
  },
  setTokenCookie: (res: FastifyReply, token: string) => {
    res.clearCookie("token", {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.setCookie("token", token, {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });
  },
  clearTokenCookie: (res: FastifyReply, token?: string) => {
    if (token) {
      tokenBlacklist.add(token);
    }
    res.setCookie("token", "", {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 0,
    });
  },
  isTokenBlacklisted: (token: string): boolean => {
    return tokenBlacklist.has(token);
  },
};
