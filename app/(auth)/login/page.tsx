"use client";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";
import React, { useState, useTransition } from "react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormSuccess } from "../_components/form-success";
import { FormError } from "../_components/form-error";
import Link from "next/link";
import { login } from "@/actions/login";
import { signInWithGoogle } from "@/actions/signInWithGoogle";
function Login() {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onGoogleSubmit = () => {
    signInWithGoogle();
  };

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
        if (data?.success) {
          setSuccess(data.success);
        }
      });
    });
  };

  return (
    <div className="absolute left-0 h-screen overflow-y-auto flex justify-center items-center w-full">
      <div className="bg-3"></div>
      <div className="flex-1 flex justify-center items-center">
        <h1 className="text-[64px] font-semibold leading-[74px]">
          Embrace the future of <br /> Custom AI Bots
        </h1>
      </div>

      <div className="h-full min-w-[33%] bg-[#0B0B0B] px-20 py-30 flex flex-col justify-center items-center gap-20">
        <Image src={"/logo.svg"} width={250} height={60} alt="logo png" />
        {/* credentials sign in */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-10 w-full"
          >
            <div className="flex flex-col gap-4">
              <FormField
                disabled={isPending}
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1rem]">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your work email"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <FormField
                disabled={isPending}
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1rem]">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4 w-full items-center">
              <FormSuccess message={success} />
              <FormError message={error} />
              <button type="submit" className="btn sec" disabled={isPending}>
                {isPending ? "Login..." : "Login"}
              </button>
              <p className="text-[#518EF8]">
                New Here? <Link href={"/register"}>Create an Account</Link>
              </p>
            </div>
            <span className="bg-[#252525] h-[1px] w-full" />
          </form>
        </Form>

        {/* google sign in */}
        <form action={onGoogleSubmit} className="w-full">
          <button type="submit" className="btn prim !w-full flex gap-4">
            <Image
              src={"/google.png"}
              width={20}
              height={20}
              alt="google png"
            />
            <p>Sign up with Google</p>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
