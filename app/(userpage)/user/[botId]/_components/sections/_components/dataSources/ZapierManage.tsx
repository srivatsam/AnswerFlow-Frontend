import { getBotData } from "@/actions/getBotData";
import Image from "next/image";
import { useEffect, useState } from "react";

export function ZapierManage() {
  const [isBotIdCopied, setIsBotIdCopied] = useState(false);
  const [isBotNameCopied, setIsBotNameCopied] = useState(false);
  const [botId, setBotId] = useState<string | null>();
  const [botKey, setBotKey] = useState<string | null>();
  const [botName, setBotName] = useState<string | null>();

  useEffect(() => {
    const getBotName = async () => {
      const botData = await getBotData(botId!);
      setBotName(botData.name);
      setBotKey(botData.key);
    };
    const botId = window.localStorage.getItem("botId");
    setBotId(botId);
    getBotName();
  }, []);
  const copyBotKey = async () => {
    try {
      setIsBotIdCopied(true);
      await navigator.clipboard.writeText(botKey as string);
      setTimeout(() => {
        setIsBotIdCopied(false);
      }, 3000);
    } catch (error) {
      console.error("Unable to copy script to clipboard", error);
      setIsBotIdCopied(false);
    }
  };
  const copyBotName = async () => {
    try {
      setIsBotNameCopied(true);
      await navigator.clipboard.writeText(botName as string);
      setTimeout(() => {
        setIsBotNameCopied(false);
      }, 3000);
    } catch (error) {
      console.error("Unable to copy script to clipboard", error);
      setIsBotNameCopied(false);
    }
  };
  return (
    <div className="flex flex-col justify-between w-[320px] md:w-fit absolute top-[120%] right-0 z-[1]">
      <div className="flex flex-col gap-4 w-full">
        <div className="bg-[#232323] rounded-[10px]  p-4 lg:px-12 lg:py-10 outline-none flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col items-start gap-2 w-[100%]">
            <h1 className="text-[20px] font-medium">
              Your Bot Key && Bot Name :
            </h1>
            <div className="rounded-[10px] bg-[#2e2e2e] p-4 lg:py-4 lg:px-8 text-[#BABABA] font-medium flex w-full justify-between items-center">
              <p className="w-[94%] whitespace-nowrap text-ellipsis overflow-hidden">
                {botKey}
              </p>
              <button onClick={copyBotKey}>
                {isBotIdCopied ? (
                  <Image
                    src={"/correct.png"}
                    width={20}
                    height={20}
                    alt="copy image"
                  />
                ) : (
                  <Image
                    src={"/copy.png"}
                    width={20}
                    height={20}
                    alt="copy image"
                  />
                )}
              </button>
            </div>
            <div className="rounded-[10px] bg-[#2e2e2e] p-4 lg:py-4 lg:px-8 text-[#BABABA] font-medium flex w-full justify-between items-center">
              <p className="w-[94%] whitespace-nowrap text-ellipsis overflow-hidden">
                {botName || "botName"}
              </p>
              <button onClick={copyBotName}>
                {isBotNameCopied ? (
                  <Image
                    src={"/correct.png"}
                    width={20}
                    height={20}
                    alt="copy image"
                  />
                ) : (
                  <Image
                    src={"/copy.png"}
                    width={20}
                    height={20}
                    alt="copy image"
                  />
                )}
              </button>
            </div>
            <p className="text-[#9D9D9D]">You Need It To Connect The Zapier</p>
          </div>
          <div className="flex flex-col items-start gap-2 w-[100%]">
            <h1 className="text-[20px] font-medium">1. Add a Trigger :</h1>
            <p className="text-[#9D9D9D] text-xs">
              - Choose the app that will trigger your Zap (the one that will
              initiate the workflow). <br /> - Select the specific event within
              that app that will act as the trigger. <br /> - Connect your app
              account (if not already connected). <br />- Configure the trigger
              options to fit your needs. <br />- Test the trigger to ensure it
              pulls in the correct data.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 w-[100%]">
            <h1 className="text-[20px] font-medium">2. Add AnswerFlow :</h1>
            <p className="text-[#9D9D9D] text-xs">
              - Choose AnswerFlow. <br />
              - Login using the bot key, and bot name. <br />
              - Set up the data you want to send to AnswerFlow. <br />- Test the
              action to verify that it works as expected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
