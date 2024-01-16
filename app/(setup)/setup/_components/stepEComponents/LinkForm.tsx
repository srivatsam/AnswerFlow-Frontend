import { useFormContext } from "@/context/FormContext";
import React from "react";
type props = { handleNext: () => void };
export function LinkForm({ handleNext }: props) {
  const { formData, setFiles, setUrls } = useFormContext();
  const addUrlData = async (e: FormData) => {
    if (e) {
      setUrls(e.get("link") as string);
      try {
        const response = await fetch(
          `//ec2-13-127-192-129.ap-south-1.compute.amazonaws.com/create_resource/1/1`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type: "url",
              name: e.get("link"),
            }),
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        if (!responseData.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        localStorage.setItem("botId", responseData.bot.id);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <form
      action={(e) => addUrlData(e)}
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
      <div className="flex justify-between w-full items-center">
        <button
          // disabled={formData.openAiApiKey == ""}
          type="submit"
          className={`btn sec flex !justify-around`}
        >
          <p>Add to Data Source</p>
        </button>
        <button
          // disabled={formData.openAiApiKey == ""}
          className={`btn sec flex !justify-around ${
            formData.urls.length == 0 &&
            formData.files.length == 0 &&
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
