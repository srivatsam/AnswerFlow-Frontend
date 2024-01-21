"use client";
import React, { useEffect } from "react";

import { useActiveSection } from "@/hooks/use-active-section";

import Chat from "./sections/Chat";
import PastChat from "./sections/PastChat";
import DataSources from "./sections/DataSources";
import Export from "./sections/Export";
import BotSettings from "./sections/BotSettings";

export function Sections({ botData }: { botData: any }) {
  const setActiveSection = useActiveSection((state) => state.setActiveSection);
  const activeSection = useActiveSection((state) => state.activeSection);
  useEffect(() => {
    setActiveSection("Chat");
  }, [setActiveSection]);

  return (
    <div className="flex flex-col gap-6 w-full">
      {activeSection == "Chat" && <Chat botData={botData} />}
      {activeSection == "Past Chat" && <PastChat />}
      {activeSection == "Data Sources" && <DataSources />}
      {activeSection == "Export" && <Export />}
      {activeSection == "Bot Settings" && <BotSettings />}
    </div>
  );
}
