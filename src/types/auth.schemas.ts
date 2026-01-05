import { z } from "zod";

export const registerUserBodySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters long"),
});

export type RegisterUserBody = z.infer<typeof registerUserBodySchema>;

export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email("Invalid email"),
  subscriptionType: z.enum(["FREE", "PREMIUM"]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type UserResponse = z.infer<typeof userResponseSchema>;

export const loginBodySchema = z.object({
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginBody = z.infer<typeof loginBodySchema>;
