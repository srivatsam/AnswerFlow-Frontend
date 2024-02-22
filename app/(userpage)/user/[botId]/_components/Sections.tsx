"use client";
import React, { Suspense, useEffect } from "react";

import { useActiveSection } from "@/hooks/use-active-section";

import Chat from "./sections/Chat";
import PastChat from "./sections/PastChat";
import DataSources from "./sections/DataSources";
import Export from "./sections/Export";
import BotSettings from "./sections/BotSettings";
import { useSteps } from "@/hooks/use-steps";
import { useRouter } from "next/navigation";
import { activeSectionType } from "@/types/activeSection";

export function Sections({
  botData,
  userPlan,
  botResources,
  pastChat,
}: {
  botData: any;
  pastChat: any;
  userPlan: string;
  botResources: any;
}) {
  const setActiveSection = useActiveSection((state) => state.setActiveSection);
  const activeSection = useActiveSection((state) => state.activeSection);
  const resetToNewBot = useSteps((state) => state.resetToNewBot);
  const route = useRouter();

  useEffect(() => {
    setActiveSection(
      localStorage.getItem("activeSection") as activeSectionType
    );
  }, [setActiveSection]);

  if (botData)
    return (
      <div className="flex flex-col gap-6 w-full">
        {activeSection == "Chat" && (
          <Chat pastChat={pastChat} botData={botData} />
        )}
        {activeSection == "Past Chat" && (
          <PastChat pastChat={pastChat} botData={botData} />
        )}
        {activeSection == "Data Sources" && (
          <DataSources
            botData={botData}
            userPlan={userPlan}
            botResources={botResources}
          />
        )}
        {activeSection == "Export" && <Export botData={botData} />}
        {activeSection == "Bot Settings" && <BotSettings botData={botData} />}
      </div>
    );
  if (!botData)
    return (
      <div className="flex flex-col gap-4 w-full justify-start items-center">
        <div className="text-center bg-red-500 p-4 rounded-md w-full h-fit uppercase font-semibold">
          there is no bot have this id you can create new one
        </div>
        <button
          onClick={() => {
            resetToNewBot();
            route.push(`/setup`);
          }}
          className="btn sec"
        >
          Create New Bot
        </button>
      </div>
    );
}
