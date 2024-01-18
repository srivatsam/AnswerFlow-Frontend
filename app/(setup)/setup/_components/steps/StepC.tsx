import { setAiKey } from "@/actions/setAiKey";
import { FormError } from "@/app/(auth)/_components/form-error";
import { FormSuccess } from "@/app/(auth)/_components/form-success";
import { useFormContext } from "@/context/FormContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useTransition } from "react";
type props = { handleNext: () => void };
function StepC({ handleNext }: props) {
  const { formData, setOpenAiApiKey } = useFormContext();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const openAiApiKeySubmit = (formData: FormData) => {
    startTransition(() => {
      setAiKey(formData).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
        if (data?.success) {
          setSuccess(data.success);
          handleNext();
        }
      });
    });
  };
  return (
    <section className="h-screen flex justify-center items-center w-full flex-col ">
      <form
        action={openAiApiKeySubmit}
        className="flex flex-col justify-around items-center w-[500px] h-full"
      >
        <Image src={"/logo.svg"} width={250} height={60} alt="logo png" />
        <div className="flex flex-col gap-3">
          <label htmlFor="APIKey" className="font-medium">
            OpenAI API Key
          </label>
          <input
            type="text"
            id="APIKey"
            name="APIKey"
            value={formData.openAiApiKey}
            onChange={(e) => setOpenAiApiKey(e.target.value)}
            required
            placeholder="Paste your key here"
            className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
          />
          <p className="text-[#909090]">
            <Link href={"/"} className="text-[#518EF8] text-[14px]">
              Learn more
            </Link>{" "}
            about how you can get your OpenAI API Key
          </p>
        </div>

        <div className="flex justify-center items-center flex-col gap-4">
          <FormSuccess message={success} />
          <FormError message={error} />
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
    </section>
  );
}

export default StepC;
