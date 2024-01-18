import { addUrlData } from "@/actions/addUrlData";
import { FormError } from "@/app/(auth)/_components/form-error";
import { FormSuccess } from "@/app/(auth)/_components/form-success";
import { useFormContext } from "@/context/FormContext";
import React, { useState, useTransition } from "react";
type props = { handleNext: () => void };
export function LinkForm({ handleNext }: props) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const { formData, setUrls } = useFormContext();

  const addUrlDataHandle = async (formDataInputs: FormData) => {
    if (formDataInputs) {
      const botId = window.localStorage.getItem("botId") as string;
      startTransition(() => {
        addUrlData(formDataInputs, botId).then((response) => {
          if (response?.error) {
            setError(response.error);
          }
          if (response?.success) {
            setSuccess(response.success);
            setUrls(formDataInputs.get("link") as string);
          }
        });
      });
    }
  };
  return (
    <form
      action={addUrlDataHandle}
      className="flex-1 flex flex-col justify-end gap-40 w-full"
    >
      <div className="flex flex-col gap-4 w-[100%]">
        <label htmlFor="links" className="text-[20px] font-medium">
          Enter a Link
        </label>
        <input
          type="text"
          id="links"
          required
          name="link"
          placeholder="https://example.com"
          className="w-full bg-[#0B0B0B] py-4 px-10 outline-none rounded-[10px] text-[20px]"
        />
        <p className="text-[#9D9D9D]">
          AnswerFlow AI will import content from this link to your
          Knowledge-base
        </p>
      </div>
      <FormSuccess message={success} />
      <FormError message={error} />
      <div className="flex justify-between w-full items-center">
        <button
          // disabled={formData.urls.length == 0 || isPending}
          type="submit"
          className={`btn sec flex !justify-around `} //${isPending && "opacity-50 cursor-not-allowed"}
        >
          <p>{isPending ? "Adding Data Source" : "Add to Data Source"}</p>
        </button>
        <button
          // disabled={
          //   isPending || formData.files.length > 0 || formData.urls.length > 0
          // }
          className={`btn sec flex !justify-around `} //${formData.urls.length == 0 &&formData.files.length == 0 &&" opacity-50 cursor-not-allowed"}
          onClick={handleNext}
        >
          <p>Finish Setup</p>
        </button>
      </div>
    </form>
  );
}
