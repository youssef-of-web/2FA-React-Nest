import { z } from "zod";

export const RegisterSchema = z.object({
  fullname: z
    .string({
      required_error: "Required field",
    })
    .nonempty(),
  email: z.string({ required_error: "Required field" }).email().nonempty(),
  password: z.string({ required_error: "Required field" }).nonempty(),
});

export const LoginSchema = z.object({
  email: z.string({ required_error: "Required field" }).email().nonempty(),
  password: z.string({ required_error: "Required field" }).nonempty(),
});

export const GenOTPSchema = z.object({
  token: z.string().max(6).min(6).nonempty(),
  id: z.string().nonempty(),
});

export type LoginValues = z.infer<typeof LoginSchema>;
export type RegisterValues = z.infer<typeof RegisterSchema>;
export type GenOTPValues = z.infer<typeof GenOTPSchema>;
