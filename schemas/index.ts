import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, "Email is required"),
});

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,}$/;

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: "Email is required" }),
    name: z.string().min(4, { message: "Name is required" }),
    password: z
      .string()
      .min(6, { message: "Password is required" })
      .refine((value) => passwordRegex.test(value), {
        message: `Must contain at least 1A , 1a ,1# `,
      }),
    confirmPassword: z.string().min(6, { message: "Password not match" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not match",
    path: ["confirmPassword"],
  });
