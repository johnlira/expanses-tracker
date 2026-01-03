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
    const token = tokenService.generateToken(user.id);
    tokenService.setTokenCookie(res, token);
    return res.status(201).send({
      message: "User registered successfully",
      user,
    });
  },
  login: async (req: FastifyRequest, res: FastifyReply) => {
    const body = req.body as LoginBody;
    const user = await loginService(body);
    const token = tokenService.generateToken(user.id);
    tokenService.setTokenCookie(res, token);
    return res.status(200).send({
      message: "User logged in successfully",
      user,
    });
  },
  logout: async (req: FastifyRequest, res: FastifyReply) => {
    tokenService.clearTokenCookie(res);
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
