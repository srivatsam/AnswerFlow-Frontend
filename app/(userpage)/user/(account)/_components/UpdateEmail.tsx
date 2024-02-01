"use client";

import React from "react";
type props = {
  email: string | null;
};
export function UpdateEmail({ email }: props) {
  return (
    <>
      <h1 className="text-[28px] font-bold ">Settings</h1>
      <form /* action={formHandle}  */ className="flex flex-col gap-4 ">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email || ""}
            required
            placeholder="Enter your work email"
            className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none opacity-40"
          />
        </div>

        <button
          type="submit"
          /*  disabled={isPending} */
          className={`btn sec ${
            /*  isPending && */ "opacity-50 cursor-not-allowed "
          }`}
        >
          {/* isPending */ /* ? "Loading..." : */ "Send Verification Link"}
        </button>
      </form>
    </>
  );
}
