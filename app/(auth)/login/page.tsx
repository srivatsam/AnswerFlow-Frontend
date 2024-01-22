"use client";
import React, { useTransition } from "react";
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

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      const registerPromise = login(values).then((data) => {
        const botExist = localStorage.getItem("botId");
        if (botExist == null) {
          route.push("/setup");
        } else {
          route.push(`/user/${botExist}`);
        }
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
        <SignWithGoogle />
      </div>
    </div>
  );
}

export default Login;
