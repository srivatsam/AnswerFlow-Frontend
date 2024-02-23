"use client";
import { setAiKey } from "@/actions/setAiKey";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

type props = {
  openai_api_key: string | null;
};
export function OpenAiKeyForm({ openai_api_key }: props) {
  const [openAI, setOpenAI] = useState(openai_api_key);
  const isChanged = openAI !== openai_api_key;
  const [isPending, startTransition] = useTransition();

  const formHandle = (e: FormData) => {
    if (e) {
      startTransition(async () => {
        const setAiKeyPromise = await setAiKey(e);
        if (setAiKeyPromise.success) {
          toast.success("Open Ai Key Updated Successfully");
        }
        if (setAiKeyPromise.error) {
          toast.error(setAiKeyPromise.error);
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
    <div className="flex flex-col bg-[#131313] rounded-[12px]  p-4 lg:p-12 gap-4 lg:gap-8">
      <h1 className="text-[28px] font-bold ">OpenAI API Key</h1>
      <form action={formHandle} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 ">
          <label htmlFor="openai_api_key" className="font-medium">
            Your API Key
          </label>
          <input
            type="text"
            id="openai_api_key"
            name="openai_api_key"
            value={openAI || ""}
            onChange={(e) => setOpenAI(e.target.value)}
            required
            placeholder="Enter your Open AI Key"
            className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none opacity-40"
          />
        </div>

        <button
          type="submit"
          disabled={isPending || openAI == "" || !isChanged}
          className={`btn sec ${
            (isPending || openAI == "" || !isChanged) &&
            "opacity-50 cursor-not-allowed "
          }`}
        >
          {isPending ? "Loading..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
