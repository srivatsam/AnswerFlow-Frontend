import React, { useState, useTransition } from "react";
import Image from "next/image";

import { useFormContext } from "@/context/FormContext";
import { createBot } from "@/actions/createBot";

import { toast } from "sonner";
import { motion } from "framer-motion";

import { tones } from "@/utils/constData";

type props = { handleNext: () => void };

function StepD({ handleNext }: props) {
  const { formData, setBotName, setBotPurpose, setToneOfVoice } =
    useFormContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const createBotHandle = (formDataFrom: FormData) => {
    if (formData.botName || formData.botPurpose || formData.toneOfVoice) {
      formDataFrom.append("toneOfVoice", formData.toneOfVoice);
      startTransition(() => {
        const setPlanPromise = createBot(formDataFrom).then((response) => {
          if (response.success) {
            handleNext();
            localStorage.setItem("botId", response.data.bot.id);
          }
        });
        toast.promise(setPlanPromise, {
          loading: "Loading...",
          success: "Bot Created Successfully",
          error: "Something Went Wrong Try Agin",
        });
      });
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setToneOfVoice(option);
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex justify-center items-center w-full"
    >
      <form
        action={createBotHandle}
        className="flex flex-1 flex-col justify-between min-h-screen  items-start w-full px-20 py-20"
      >
        <h1 className="text-[40px] font-bold">Create a Bot</h1>
        <div className="w-[460px] flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="botName" className="font-medium">
              Bot Name
            </label>
            <input
              type="text"
              id="botName"
              name="botName"
              value={formData.botName}
              onChange={(e) => {
                setBotName(e.target.value);
              }}
              required
              placeholder="Enter a name. Eg: Customer Support"
              className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <label htmlFor="botPurpose" className="font-medium">
                Instructions
              </label>
              <div className="relative group cursor-pointer">
                <Image src={"/info.png"} width={15} height={15} alt="info" />
                <div className="bg-[#424242] w-[240px] text-[12px] py-4 px-8 rounded-md absolute text-center bottom-[20px] left-[50%] translate-x-[-50%] invisible  group-hover:visible">
                  This helps us automatically fine tune the bots responses to
                  match your usecase
                </div>
              </div>
            </div>
            <textarea
              id="botPurpose"
              value={formData.botPurpose}
              onChange={(e) => {
                setBotPurpose(e.target.value);
              }}
              name="botPurpose"
              required
              placeholder="A customer support agent for a saas company that operates in healthcare market"
              className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none min-h-[140px]  max-h-[240px]"
            />
          </div>
          <div className="flex flex-col gap-2 relative  text-left">
            <label htmlFor="toneOfVoice" className="font-medium">
              Tone Of Voice
            </label>
            <button
              type="button"
              className="inline-flex justify-between items-center w-full bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
              id="options-menu"
              onClick={toggleDropdown}
            >
              {formData.toneOfVoice || "Select an option"}
              <Image
                src={"/downArrow.png"}
                width={20}
                height={20}
                alt="down Arrow image"
              />
            </button>
            {isOpen && (
              <div className="absolute top-[100%] z-10 w-full mt-2 bg-[#232323] rounded-[10px] max-h-40 overflow-y-auto transition-all">
                <div
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {tones.map((tone) => (
                    <div
                      key={tone.id}
                      className="block px-8 py-4 text-sm text-gray-50 hover:bg-[#2c2c2c] transition-all cursor-pointer"
                      role="menuitem"
                      onClick={() => selectOption(tone.title)}
                    >
                      {tone.title}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center flex-col gap-4">
          <button
            type="submit"
            disabled={isPending}
            className={`btn sec flex !justify-around ${
              (formData.botName.length == 0 ||
                formData.botPurpose.length == 0 ||
                formData.toneOfVoice.length == 0) &&
              " opacity-50 cursor-not-allowed"
            }`}
          >
            <p>{isPending ? "Creating..." : "Next"}</p>
            <Image
              src={"/rightarrow.png"}
              width={8}
              height={8}
              alt="rightarrow png"
            />
          </button>
        </div>
      </form>
      <div className="min-h-screen min-w-[33%] bg-[#0B0B0B] py-30 flex flex-col justify-center items-start gap-20">
        <h2 className="px-20 text-[#707070] text-[32px] font-bold">
          Setup Progress
        </h2>
        <div className="flex flex-col justify-center items-start gap-10 ">
          <div className="flex flex-col justify-start items-start gap-6 px-20">
            <p className="text-[#9D9D9D] uppercase ">1. basic settings</p>
            {formData.botName ? (
              <p className="text-[18px] h-[31px]">{formData.botName}</p>
            ) : (
              <div className="w-[341px] h-[31px] bg-[#1E1E1E] rounded"></div>
            )}
          </div>
          <br />
          <div className="flex flex-col justify-start items-start gap-6 px-20">
            <p className="text-[#9D9D9D] uppercase">2. Data sources</p>
            <div className="flex flex-col gap-2">
              <div className="w-[341px] h-[31px] bg-[#1E1E1E] rounded"></div>
              <div className="w-[341px] h-[31px] bg-[#1E1E1E] rounded"></div>
              <div className="w-[341px] h-[31px] bg-[#1E1E1E] rounded"></div>
            </div>
          </div>
          <br />
          <div className="flex flex-col justify-start items-start gap-6 px-20">
            <p className="text-[#9D9D9D] uppercase">3. create bot</p>
            <div className="flex flex-col gap-2">
              <div className="w-[341px] h-[31px] bg-[#1E1E1E] rounded"></div>
              <div className="w-[341px] h-[31px] bg-[#1E1E1E] rounded"></div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </motion.div>
  );
}

export default StepD;
