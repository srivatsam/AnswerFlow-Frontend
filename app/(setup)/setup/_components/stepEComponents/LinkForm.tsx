import React, { useEffect, useState, useTransition } from "react";

import { addUrlData } from "@/actions/addUrlData";
import { useFormContext } from "@/context/FormContext";

import { toast } from "sonner";
import { useProgressBar } from "@/hooks/use-progressbar-hook";
type props = { handleNext: () => void };
export function LinkForm({ handleNext }: props) {
  const increaseProgressByNumber = useProgressBar(
    (state) => state.increaseProgressByNumber
  );
  const [Url, setUrl] = useState("");
  const [isPending, startTransition] = useTransition();
  const { setUrls, formData } = useFormContext();

  const addUrlDataHandle = async (formDataInputs: FormData) => {
    if (formDataInputs) {
      const botId = window.localStorage.getItem("botId") as string;
      startTransition(async () => {
        const setUrlDataPromise = await addUrlData(formDataInputs, botId);
        if (setUrlDataPromise.success) {
          setUrls(formDataInputs.get("link") as string);
          setUrl("");
          increaseProgressByNumber(0.3);
          toast.success(setUrlDataPromise.success);
        }
        if (setUrlDataPromise.error) {
          toast.error(setUrlDataPromise.error);
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
    <form
      action={addUrlDataHandle}
      className="flex-1 flex flex-col justify-end gap-40 w-full"
    >
      <div className="flex flex-col items-start gap-4 w-[100%]">
        <label htmlFor="links" className="text-[20px] font-medium">
          Enter a Link
        </label>
        <input
          type="text"
          id="links"
          required
          name="link"
          value={Url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full bg-[#0B0B0B] py-4 px-10 outline-none rounded-[10px] text-[20px]"
        />
        <p className="text-[#9D9D9D]">
          AnswerFlow AI will import content from this link to your
          Knowledge-base
        </p>
        <div className="flex flex-row-reverse gap-2">
          <label htmlFor="allPages" className="text-[#9D9D9D]">
            Import all pages from this Website
          </label>
          <input type="checkbox" name="allPages" id="allPages" />
        </div>
      </div>
      <div className="flex justify-between w-full items-center">
        <button
          disabled={Url == "" || isPending}
          type="submit"
          className={`btn sec flex !justify-around ${
            (isPending || Url == "") && "opacity-50 cursor-not-allowed"
          }`}
        >
          <p>{isPending ? "Adding Data Source" : "Add to Data Source"}</p>
        </button>
        <button
          disabled={
            isPending ||
            (formData.files.length == 0 &&
              formData.urls.length == 0 &&
              formData.dbs.length == 0)
          }
          className={`btn sec flex !justify-around ${
            ((formData.urls.length == 0 &&
              formData.files.length == 0 &&
              formData.dbs.length == 0) ||
              isPending) &&
            " opacity-50 cursor-not-allowed"
          }`}
          onClick={handleNext}
        >
          <p>Finish Setup</p>
        </button>
      </div>
    </form>
  );
}
