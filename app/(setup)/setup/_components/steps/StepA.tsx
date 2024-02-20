import React, { useTransition } from "react";
import Image from "next/image";
import Link from "next/link";

import { setAiKey } from "@/actions/setAiKey";
import { useFormContext } from "@/context/FormContext";

import { toast } from "sonner";
import { motion } from "framer-motion";
import { useProgressBar } from "@/hooks/use-progressbar-hook";
type props = { handleNext: () => void };
export function StepA({ handleNext }: props) {
  const increaseProgress = useProgressBar((state) => state.increaseProgress);
  const { formData, setOpenAiApiKey } = useFormContext();
  const [isPending, startTransition] = useTransition();

  const openAiApiKeySubmit = (formData: FormData) => {
    startTransition(() => {
      const setPlanPromise = setAiKey(formData).then((data) => {
        increaseProgress(1);
        handleNext();
      });
      toast.promise(setPlanPromise, {
        loading: "Loading...",
        success: "Open Ai Key Seated Successfully",
        error: (error) => `${error.message}`,
      });
    });
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="h-screen flex justify-center items-center w-full flex-col "
    >
      <form
        action={openAiApiKeySubmit}
        className="flex flex-col justify-around items-center w-[500px] h-full"
      >
        <Image src={"/logo.svg"} width={250} height={60} alt="logo png" />
        <div className="flex flex-col gap-3">
          <label htmlFor="openai_api_key" className="font-medium">
            OpenAI API Key
          </label>
          <input
            type="text"
            id="openai_api_key"
            name="openai_api_key"
            value={formData.openAiApiKey}
            onChange={(e) => setOpenAiApiKey(e.target.value)}
            required
            placeholder="Paste your key here"
            className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
          />
          <p className="text-[#909090]">
            <Link
              href={"https://platform.openai.com/account/api-keys"}
              target="_blank"
              className="text-[#518EF8] text-[14px]"
            >
              Learn more
            </Link>{" "}
            about how you can get your OpenAI API Key
          </p>
        </div>

        <div className="flex justify-center items-center flex-col gap-4">
          <button
            type="submit"
            disabled={formData.openAiApiKey == "" || isPending}
            className={`btn sec flex !justify-around ${
              (formData.openAiApiKey == "" || isPending) &&
              " opacity-50 cursor-not-allowed"
            }`}
          >
            <p>{isPending ? "Loading.." : "Next"}</p>
            <Image
              src={"/rightarrow.png"}
              width={8}
              height={8}
              alt="rightarrow png"
            />
          </button>
        </div>
      </form>
    </motion.section>
  );
}
