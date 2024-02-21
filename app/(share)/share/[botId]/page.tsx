import { getBotData } from "@/actions/getBotData";
import { getPastChat } from "@/actions/getPastChat";
import Chat from "@/app/(userpage)/user/[botId]/_components/sections/Chat";
import PastChat from "@/app/(userpage)/user/[botId]/_components/sections/PastChat";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type props = {
  params: {
    botId: string;
  };
};
async function page({ params: { botId } }: props) {
  const botData = await getBotData(botId);
  const pastChat = await getPastChat(botId);
  return (
    <div className="p-4 lg:px-20 lg:py-8 h-screen flex flex-col gap-4 lg:gap-5">
      <div className="flex flex-col-reverse lg:flex-row w-full items-center justify-between gap-6">
        <div className="flex items-center gap-2 lg:gap-4 flex-wrap">
          <h1 className="text-xl font-semibold">{botData.name} bot </h1>
          <div className="flex gap-1 text-gray-300 text-sm">
            <p>powered by </p>
            <Link href={"https://answerflowai.com"} target="_blanc">
              <p className="text-blue-500">answerflowai.com</p>
            </Link>
          </div>
        </div>
        <Link href={"https://answerflowai.com"} target="_blanc">
          <Image src={"/logo.png"} width={200} height={60} alt="logo png" />
        </Link>
      </div>

      <Chat botData={botData} shared />
      {/* <PastChat pastChat={pastChat} botData={botData} /> */}
    </div>
  );
}

export default page;
