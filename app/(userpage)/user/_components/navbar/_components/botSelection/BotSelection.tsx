"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { useSteps } from "@/hooks/use-steps";

function BotSelection({ bots }: { bots: any }) {
  const setActiveSection = useActiveSection((state) => state.setActiveSection);
  const resetToNewBot = useSteps((state) => state.resetToNewBot);
  const [botSelected, setBotSelected] = useState("");

  const [toggle, setToggle] = useState(false);
  const route = useRouter();

  useEffect(() => {
    const botName = bots.find(
      (bot: any) => (bot.id as string) == window.localStorage.getItem("botId")
    );
    if (botName) {
      setBotSelected(botName.name);
    } else {
      localStorage.setItem("botId", bots[0].id);
      setBotSelected(bots[0].name);
    }
  }, [bots]);

  return (
    <div
      onClick={() => setToggle((prev) => !prev)}
      className="flex justify-between items-center gap-10 py-2 px-4 bg-[#1B1B1B] rounded-[10px] cursor-pointer relative w-[250px]"
    >
      <div className="flex gap-2 items-center">
        <h1 className="font-medium">
          {botSelected == "" ? (
            <p className="h-4 w-32 rounded bg-[#363636]"></p>
          ) : (
            botSelected
          )}
        </h1>
      </div>
      <Image src={"/downArrow.png"} alt="user image" width={25} height={25} />

      {toggle && (
        <div className="absolute w-[stretch] top-[120%] left-0 py-2 px-4 bg-[#1B1B1B] rounded-[10px] flex flex-col items-start gap-1">
          <button
            onClick={() => {
              resetToNewBot();
              route.push(`/setup`);
            }}
            className="flex justify-between gap-1 py-1 px-2 w-full capitalize"
          >
            <p>Add Bot</p>
            <Image
              src={"/addBot.png"}
              alt="addBot image"
              width={20}
              height={20}
            />
          </button>
          <p className="h-[1px] w-full bg-gray-500" />
          {bots ? (
            bots.map((item: any) => (
              <button
                key={item.id}
                onClick={() => {
                  route.push(`/user/${item.id}`);
                  setActiveSection("Chat");
                  setBotSelected(item.name);
                  localStorage.setItem("botId", `${item.id}`);
                }}
                className="flex justify-between gap-1 py-1 px-2 w-full capitalize"
              >
                <p>{item.name}</p>
              </button>
            ))
          ) : (
            <p className="text-center">No Bots Found ! </p>
          )}
        </div>
      )}
    </div>
  );
}

export default BotSelection;
