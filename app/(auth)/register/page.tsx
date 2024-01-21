"use client";
import React, { useTransition } from "react";
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
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      const registerPromise = register(values);
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
      <div className="flex-1 flex justify-center items-center">
        <h1 className="text-[64px] font-semibold leading-[74px]">
          Embrace the future of <br /> Custom AI Bots
        </h1>
      </div>
      <div className="h-full min-w-[33%] bg-[#0B0B0B] px-20 py-30 flex flex-col justify-center items-center gap-20">
        <Image src={"/logo.svg"} width={250} height={60} alt="logo png" />
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[1rem]">User Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter Name" type="text" />
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
                <Link href={"/login"}>Have an Account?</Link>
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

export default Register;
