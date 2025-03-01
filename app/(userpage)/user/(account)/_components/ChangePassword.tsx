"use client";

import { resetPassword } from "@/actions/resetPassword";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
type props = {
  password: string | null;
};
export function ChangePassword({ password }: props) {
  const [newPassword, setNewPassword] = useState("");
  const isChanged = newPassword !== password;
  const [isPending, startTransition] = useTransition();

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{6,}$/;
  const isValid = passwordRegex.test(newPassword);

  const formHandle = (e: FormData) => {
    if (e) {
      startTransition(async () => {
        const resetPasswordPromise = await resetPassword(e);
        if (resetPasswordPromise?.success) {
          toast.success(resetPasswordPromise?.success);
        }
        if (resetPasswordPromise?.error) {
          toast.error(resetPasswordPromise.error);
        }
      });
    }
  };
  useEffect(() => {
    if (isPending) {
      toast.loading("Loading ...!");
    }
  }, [isPending]);
  return (
    <>
      <h2 className="text-[24px] font-bold text-[#777777]">Change Password</h2>
      <form action={formHandle} className="flex flex-col gap-6 ">
        <div className="flex flex-col gap-1">
          <label htmlFor="currentPassword" className="font-medium">
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            required
            placeholder="Enter your work email"
            className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none opacity-40"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="newPassword" className="font-medium">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Enter your work email"
            className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none opacity-40"
          />
          {!isValid && (
            <p className="text-[14px] text-red-500 max-w-[400px]">
              Password must be minimum 8 characters long and contain atleast one
              uppercase, one lowercase and one number.
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isPending || !isChanged || !isValid}
          className={`btn sec ${
            (isPending || !isChanged || !isValid) &&
            "opacity-50 cursor-not-allowed "
          }`}
        >
          {isPending ? "Loading..." : "Update Password"}
        </button>
      </form>
    </>
  );
}
