"use client";
import React, { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { register } from "@/actions/register";
import { SignWithGoogle } from "../_components/SignWithGoogle";

import { toast } from "sonner";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
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

function Register() {
  const route = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // return to main page (pricing) to select plan
  useEffect(() => {
    if (!localStorage.getItem("plan")) {
      toast.info("You Should Select Plan");
      route.push("/#pricing");
    }
  }, [route]);

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      const registerPromise = register(values).then((date) => {
        if (date) route.push("/payment");
      });
      toast.promise(registerPromise, {
        loading: "Loading...",
        success: "User Created Successfully",
        error: "This Email taken",
      });
    });
  };
  return (
    <div className="absolute left-0 h-screen flex justify-center items-center w-full">
      <div className="bg-3"></div>
      {/* left Heading */}
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

      {/* side bar */}
      <div className="h-full overflow-y-auto py-10 sm:max-w-[90%] md:max-w-[70%] lg:max-w-[50%] xl:max-w-[45%] 2xl:w-[33%] lg:bg-[#0B0B0B] p-6 lg:px-20 py-30 flex flex-col justify-start items-center gap-12 xl:gap-20">
        <Image
          src={"/logo.svg"}
          width={250}
          height={60}
          alt="logo png"
          priority
        />
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
            <div className="flex flex-col gap-4">
              <FormField
                disabled={isPending}
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1rem]">
                      Confirm Password
                    </FormLabel>
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
                {isPending ? "Creating user..." : "Register"}
              </button>
              <p className="text-[#518EF8]">
                <Link href={"/login"}>Already have an account?</Link>
              </p>
            </div>
            <span className="bg-[#252525] h-[1px] w-full" />
          </form>
        </Form>
        {/* google sign in */}
        <SignWithGoogle redirect="setup" />
      </div>
    </div>
  );
}

export default Register;
