import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export function SignWithGoogle({ redirect }: { redirect: string }) {
  const onGoogleSubmit = () => {
    signIn("google", {
      callbackUrl: `/${redirect}`,
    });
  };
  return (
    <form action={onGoogleSubmit} className="w-full">
      <button type="submit" className="btn prim !w-full flex gap-4">
        <Image src={"/google.png"} width={20} height={20} alt="google png" />
        <p>Sign up with Google</p>
      </button>
    </form>
  );
}
