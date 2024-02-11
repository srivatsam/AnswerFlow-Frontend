import React, { useState, useTransition } from "react";

import { addUrlData } from "@/actions/addUrlData";

import { toast } from "sonner";
export function LinkManage() {
  const [Url, setUrl] = useState("");
  const [isPending, startTransition] = useTransition();

  const addUrlDataHandle = async (formDataInputs: FormData) => {
    if (formDataInputs) {
      const botId = window.localStorage.getItem("botId") as string;
      startTransition(() => {
        const setPlanPromise = addUrlData(formDataInputs, botId).then(
          (data) => {
            if (data) {
              setUrl("");
            }
          }
        );
        toast.promise(setPlanPromise, {
          loading: "Loading...",
          success: "Data Added Successfully",
          error: (error) => `${error.message}`,
        });
      });
    }
  };
  return (
    <form
      action={addUrlDataHandle}
      className="flex flex-col gap-6 justify-between items-start w-fit absolute top-[120%] right-0 z-[1] bg-[#232323] rounded-[10px] px-12 py-10 "
    >
      <div className="flex flex-col gap-2 w-[100%]">
        <label htmlFor="links" className="text-[18px] font-medium">
          Enter a Link
        </label>
        <p className="text-[14px] text-[#606060]">
          AnswerFlow AI will import content <br /> from this link
        </p>
      </div>
      <div className="">
        <input
          type="text"
          id="links"
          required
          name="link"
          value={Url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="bg-[#484848] py-4 px-4 outline-none rounded-[10px] text-[14px] max-w-[200px]"
        />
      </div>
      <button
        disabled={Url == "" || isPending}
        type="submit"
        className={`bg-[#1C1C1C] text-[16px] px-8 py-2 rounded-[10px] w-fit ${
          (isPending || Url == "") && "opacity-50 cursor-not-allowed"
        }`}
      >
        <p>{isPending ? "Importing.." : "Import Data"}</p>
      </button>
    </form>
  );
}
