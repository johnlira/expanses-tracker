import { FastifyReply } from "fastify";
import { server } from "../../../lib/fastify";

export const tokenService = {
  generateToken: (userId: number) => {
    return server.jwt.sign({ sub: userId }, { expiresIn: "1h" });
  },
  setTokenCookie: (res: FastifyReply, token: string) => {
    res.setCookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000, // 1 hour
    });
  },
  clearTokenCookie: (res: FastifyReply) => {
    res.clearCookie("token");
  },
};
