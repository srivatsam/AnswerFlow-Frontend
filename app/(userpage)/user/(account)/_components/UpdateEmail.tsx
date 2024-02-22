"use client";

import { changeEmail } from "@/actions/changeEmail";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
type props = {
  email: string | null;
};
export function UpdateEmail({ email }: props) {
  const [emailState, setEmailState] = useState(email || "");
  const isChanged = emailState !== email;
  const [isPending, startTransition] = useTransition();

  const formHandle = (e: FormData) => {
    if (e) {
      startTransition(async () => {
        const changeEmailPromise = await changeEmail(e);
        if (changeEmailPromise?.success) {
          toast.success(changeEmailPromise?.success);
        }
        if (changeEmailPromise?.error) {
          toast.error(changeEmailPromise.error);
        }
      });
    }
  };
  return (
    <>
      <h1 className="text-[28px] font-bold ">Settings</h1>
      <form action={formHandle} className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={emailState}
            onChange={(e) => setEmailState(e.target.value)}
            required
            placeholder="Enter your work email"
            className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isPending || !isChanged}
          className={`btn sec ${
            (isPending || !isChanged) && "opacity-50 cursor-not-allowed "
          }`}
        >
          {isPending ? "Loading..." : "Send Verification Link"}
        </button>
      </form>
    </>
  );
}
