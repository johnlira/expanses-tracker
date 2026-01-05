import { FastifyRequest, FastifyReply } from "fastify";
import { registerUserService } from "./services/register-user";
import { loginService } from "./services/login";
import { meService } from "./services/me";
import { RegisterUserBody, LoginBody } from "../../types/auth.schemas";
import { tokenService } from "./services/token";

export const authControllers = {
  registerUser: async (req: FastifyRequest, res: FastifyReply) => {
    const body = req.body as RegisterUserBody;
    const user = await registerUserService(body);
    const token = await tokenService.generateToken(user.id);
    tokenService.setTokenCookie(res, token);
    return res.status(201).send({
      message: "User registered successfully",
      user,
    });
  },
  login: async (req: FastifyRequest, res: FastifyReply) => {
    const body = req.body as LoginBody;
    const user = await loginService(body);
    const token = await tokenService.generateToken(user.id);
    tokenService.setTokenCookie(res, token);
    return res.status(200).send({
      message: "User logged in successfully",
      user,
    });
  },
  logout: async (req: FastifyRequest, res: FastifyReply) => {
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

    for (const token of tokens) {
      tokenService.clearTokenCookie(res, token);
    }

    if (tokens.length === 0) {
      tokenService.clearTokenCookie(res);
    }

    return res.status(200).send({
      message: "User logged out successfully",
    });
  },
  me: async (req: FastifyRequest, res: FastifyReply) => {
    const userId = (req.user as { sub: number }).sub;
    const user = await meService(userId);
    return res.status(200).send({
      message: "User verified successfully",
      user,
    });
  },
};
