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
    password: z
      .string()
      .min(6, { message: "Password is required" })
      .refine((value) => passwordRegex.test(value), {
        message: `Password must be minimum 8 characters long and contain atleast one
        uppercase, one lowercase and one number.`,
      }),
    confirmPassword: z.string().min(6, { message: "Password not match" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password not match",
    path: ["confirmPassword"],
  });
