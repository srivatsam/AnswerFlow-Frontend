"use client";
import React, { useEffect, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";

import { login } from "@/actions/login";
import { SignWithGoogle } from "../_components/SignWithGoogle";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function Login() {
  const route = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      const registerPromise = login(values).then(() => {
        route.push(`/user/profile`);
      });

      toast.promise(registerPromise, {
        loading: "Loading...",
        success: "User Login Successfully",
        error: "Email or Password is Wrong",
      });
    });
  };

  return (
    <div className="absolute left-0 h-screen overflow-y-auto flex justify-center items-center w-full">
      <div className="bg-3"></div>
      <div className="flex-1 hidden lg:flex justify-center items-center ">
        <div className="flex flex-col gap-6 px-6">
          <h1 className="text-[54px] xl:text-[64px] font-semibold leading-[74px]">
            Oh wait, there’s <br />
            an AI Bot for it..
          </h1>
          <p className="text-[20px] xl:text-[24px] text-[#848484]">
            AnswerFlow AI is the simplest & affordable way to build <br />{" "}
            custom ChatGPT Bots for any usecase from Data Analytics
            <br /> to Personal Health Coach
          </p>
        </div>
      </div>

      <div className="h-full overflow-y-auto py-10 min-w-[33%] lg:bg-[#0B0B0B] p-6 lg:px-20 py-30 flex flex-col justify-center items-center gap-12 xl:gap-20">
        <Image
          src={"/logo.svg"}
          width={250}
          height={60}
          alt="logo png"
          priority
        />
        {/* credentials sign in */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 lg:gap-10 w-full"
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
              <button type="submit" className="btn sec" disabled={isPending}>
                {isPending ? "Login..." : "Login"}
              </button>
              <p className="text-[#518EF8]">
                <Link href={"/register"}>New Here? Create an Account</Link>
              </p>
              <p className="text-[#518EF8]">Forgot Password?</p>
            </div>
            <span className="bg-[#252525] h-[1px] w-full" />
          </form>
        </Form>

        {/* google sign in */}
        {/* <SignWithGoogle /> */}
      </div>
    </div>
  );
}

export default Login;
