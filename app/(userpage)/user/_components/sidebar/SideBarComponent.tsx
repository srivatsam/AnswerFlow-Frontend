"use client";

import Image from "next/image";
import BotSelection from "../navbar/_components/botSelection/BotSelection";
import { SideBarSections } from "./_components/SideBarSections";
import { UsageComponent } from "./_components/UsageComponent";
import { useToggle } from "@/hooks/useToggle";
import Upgrade from "../navbar/_components/Upgrade";

export function SideBarComponent({
  bots,
  userUsage,
}: {
  bots: any;
  userUsage: any;
}) {
  const { toggle, setToggle } = useToggle((state) => state);
  return (
    <div
      className={`absolute h-screen w-screen lg:h-[inherit] bg-black lg:bg-transparent lg:relative ${
        toggle ? "left-[0%]" : "left-[-110%]"
      } lg:left-0 top-0 flex flex-col justify-between lg:w-[280px] shrink-0 z-[40] transition-all`}
    >
      <div className="flex flex-col gap-4 py-4 lg:py-[0px]">
        <div className="lg:hidden flex justify-between items-center px-4">
          <Image src={"/logo.png"} width={140} height={60} alt="logo png" />
          <Image
            onClick={() => setToggle(false)}
            src={"/close.png"}
            width={16}
            height={16}
            alt="close png"
            className="cursor-pointer"
          />
        </div>
        <div className="block lg:hidden px-4 w-full">
          <BotSelection bots={bots} />
        </div>
        <p className="lg:hidden block h-[0.5px] w-full bg-gray-400" />
        {/* sections (features) */}
        <SideBarSections />
      </div>

      {/* data usage */}
      <div className="p-4 lg:p-0 flex flex-col gap-4">
        <div className="block lg:hidden">
          <Upgrade />
        </div>
        <UsageComponent userUsage={userUsage} />
      </div>
    </div>
  );
}
