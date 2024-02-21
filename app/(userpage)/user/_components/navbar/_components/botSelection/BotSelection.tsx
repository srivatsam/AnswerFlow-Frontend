"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useActiveSection } from "@/hooks/use-active-section";

function BotSelection({ bots }: { bots: any }) {
  const setActiveSection = useActiveSection((state) => state.setActiveSection);
  const [botSelected, setBotSelected] = useState("Bot Name");

  const [toggle, setToggle] = useState(false);
  const route = useRouter();

  useEffect(() => {
    if (bots.length !== 0) {
      const botName = bots.find(
        (bot: any) => (bot.id as string) == window.localStorage.getItem("botId")
      );
      if (botName) {
        setBotSelected(botName.name);
      } else {
        localStorage.setItem("botId", bots[0].id);
        setBotSelected(bots[0].name);
      }
    }
  }, [bots]);

  return (
    <>
      <div className="bg-[#1B1B1B] rounded-[10px] relative w-full lg:w-[250px] z-[2]">
        <div
          onClick={() => setToggle((prev) => !prev)}
          className="flex justify-between items-center py-2 px-4 cursor-pointer "
        >
          <div className="flex gap-2 items-center w-[80%]">
            <h1 className="font-medium whitespace-nowrap text-ellipsis overflow-hidden">
              {botSelected}
            </h1>
          </div>
          <Image
            src={"/downArrow.png"}
            alt="user image"
            width={25}
            height={25}
          />
        </div>
        {toggle && (
          <div className="absolute w-[stretch] top-[120%] left-0 py-2 px-4 bg-[#1B1B1B] rounded-[10px] flex flex-col items-start gap-1">
            <button
              onClick={() => {
                setToggle(false);
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
            {bots.length !== 0 ? (
              bots.map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setToggle(false);
                    route.push(`/user/${item.id}`);
                    if (localStorage.getItem("activeSection") == "") {
                      setActiveSection("Chat");
                    }
                    setBotSelected(item.name);
                    localStorage.setItem("botId", `${item.id}`);
                  }}
                  className="flex justify-between gap-1 py-1 px-2 w-[90%] capitalize "
                >
                  <p className="whitespace-nowrap text-ellipsis overflow-hidden">
                    {item.name}
                  </p>
                </button>
              ))
            ) : (
              <p className="text-center">No Bots Found ! </p>
            )}
          </div>
        )}
      </div>
      {toggle && (
        <div
          onClick={() => {
            setToggle(false);
          }}
          className="fixed w-screen h-screen top-0 left-0 z-[1]"
        ></div>
      )}
    </>
  );
}

export default BotSelection;
