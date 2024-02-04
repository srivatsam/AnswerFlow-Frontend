import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { deleteBot } from "@/actions/deleteBot";
import { updateBot } from "@/actions/updateBot";

import { tones } from "@/utils/constData";

import { toast } from "sonner";

type props = {
  botData: any;
};
function BotSettings({ botData }: props) {
  const deleteConfirm = `DELETE/${botData.name}`;
  const [deleteMassage, setDeleteMassage] = useState("");
  const route = useRouter();
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [botName, setBotName] = useState<string>(botData.name);
  const [botPurpose, setBotPurpose] = useState<string>(botData.system_prompt);
  const [botTone, setBotTone] = useState<string>(botData.tone);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(botData.tone);
  const [isPending, startTransition] = useTransition();
  const [isPendingDelete, startTransitionDelete] = useTransition();

  const isChanged =
    botName !== botData.name ||
    botPurpose !== botData.system_prompt ||
    botTone !== botData.tone;
  const isValid =
    botName.trim() !== "" && botPurpose.trim() !== "" && botTone.trim() !== "";

  const updateBotHandle = (formDataFrom: FormData) => {
    if (formDataFrom && isValid && isChanged) {
      formDataFrom.append("toneOfVoice", selectedOption as string);
      startTransition(() => {
        const setPlanPromise = updateBot(
          formDataFrom,
          localStorage.getItem("botId")!
        );
        toast.promise(setPlanPromise, {
          loading: "Loading...",
          success: "Bot Updated Successfully",
          error: "Something Went Wrong Try Agin",
        });
      });
    }
  };

  const deleteHandle = () => {
    startTransitionDelete(() => {
      const setPlanPromise = deleteBot(localStorage.getItem("botId")!).then(
        () => {
          route.push("/user/profile");
        }
      );
      toast.promise(setPlanPromise, {
        loading: "Loading...",
        success: "Bot Deleted Successfully",
        error: "Something Went Wrong Try Agin",
      });
    });
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setBotTone(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  const popupDelete = () => {
    setDeletePopUp(true);
  };

  return (
    <div className="flex flex-col w-fit bg-[#131313] rounded-[12px] p-12 gap-20">
      <form
        action={updateBotHandle}
        className="flex flex-1 flex-col gap-12 items-start w-full "
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-[26px] font-bold">Bot Settings</h1>
          <p className="text-[#9B9B9B] text-[16px]">
            Manage your bot settings{" "}
          </p>
        </div>
        <div className="w-[460px] flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <label htmlFor="botName" className="font-medium">
              Bot Name
            </label>
            <input
              type="text"
              id="botName"
              name="botName"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
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
              value={botPurpose}
              onChange={(e) => setBotPurpose(e.target.value)}
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
              {botTone || "Select an option"}
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
            disabled={isPending || !isValid || !isChanged}
            className={`btn sec flex !justify-around ${
              (!isValid || isPending || !isChanged) &&
              " opacity-50 cursor-not-allowed"
            } `}
          >
            <p>{isPending ? "Saving..." : "Save Changes"}</p>
          </button>
        </div>
      </form>
      <div className="flex flex-1 flex-col gap-12 items-start w-full">
        <h1 className="text-[24px] font-bold text-[#777777]">
          Invite your Team
        </h1>
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="emails" className="font-medium">
            Invite by Email
          </label>
          <input
            type="text"
            id="emails"
            name="emails"
            required
            placeholder="Enter email address separated by comma"
            className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
          />
        </div>
        <hr />
        <div className="bg-[#373737] p-10 rounded-[10px] flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-[20px]  font-medium">Delete Bot</h1>
            <p className="text-[14px] text-[#8A8A8A] font-medium">
              Please note that this action cannot be undone and <br /> all the
              users and invited members will loose access to the bot.
            </p>
          </div>
          <div
            onClick={popupDelete}
            className="bg-[#232323] rounded-[10px] py-4 px-10 w-fit cursor-pointer"
          >
            {isPendingDelete ? "Deleting Bot ..." : "Delete Sales Bot"}
          </div>
          {deletePopUp && (
            <div className="fixed z-50 inset-0 overflow-hidden backdrop-blur-3xl flex justify-center items-center ">
              <div className="flex flex-col justify-start items-start gap-4 px-12 py-8 bg-black/60 rounded-[10px]">
                <label htmlFor="deleteConfirm" className="select-none">
                  All the information in the bot will be deleted. <br />
                  Type <span className="font-bold">{deleteConfirm}</span> to
                  confirm.
                </label>
                <input
                  type="text"
                  name="deleteConfirm"
                  id="deleteConfirm"
                  value={deleteMassage}
                  onChange={(e) => setDeleteMassage(e.target.value)}
                  placeholder={deleteConfirm}
                  className="bg-[#232323] rounded-[10px] px-8 py-4 outline-none"
                />
                <div className=" flex justify-between items-center w-full">
                  <button
                    disabled={deleteMassage !== deleteConfirm}
                    onClick={(e) => {
                      e.preventDefault();
                      deleteHandle();
                    }}
                    className={`${
                      deleteMassage !== deleteConfirm &&
                      "opacity-40 cursor-not-allowed"
                    } bg-[#fa5555] rounded-[10px] py-4 px-10 w-fit`}
                  >
                    {isPendingDelete ? "Deleting Bot ..." : "Delete Sales Bot"}
                  </button>
                  <button
                    className="bg-[#232323] rounded-[10px] py-4 px-10 w-fit"
                    onClick={(e) => {
                      e.preventDefault();
                      setDeletePopUp(false);
                    }}
                  >
                    cancel
                  </button>
                </div>
              </div>
              <div
                onClick={() => setDeletePopUp(false)}
                className="fixed z-[-10] inset-0 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BotSettings;
