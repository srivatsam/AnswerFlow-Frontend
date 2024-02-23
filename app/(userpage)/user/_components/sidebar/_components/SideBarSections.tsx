"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useActiveSection } from "@/hooks/use-active-section";
import { activeSectionType } from "@/types/activeSection";
import { useToggle } from "@/hooks/useToggle";

// sections data
const sections: activeSectionType[] = [
  "Chat",
  "Past Chat",
  "Data Sources",
  "Export",
  "Bot Settings",
];
export function SideBarSections() {
  const setToggle = useToggle((state) => state.setToggle);

  const route = useRouter();

  const { activeSection, setActiveSection } = useActiveSection(
    (state) => state
  );

  const onClickSection = (section: activeSectionType) => {
    route.push(`/user/${localStorage.getItem("botId")}`);
    setActiveSection(section);
  };

  return (
    <div className="rounded-[10px] lg:bg-[#161616] flex flex-col text-[22px] py-2 font-medium overflow-hidden">
      {sections.map((section, i) => (
        <button
          key={i}
          onClick={() => {
            onClickSection(section);
            setToggle(false);
          }}
          className={`flex gap-4 items-center cursor-pointer hover:brightness-100 brightness-[0.3] transition-all py-3 lg:py-4 px-4 hover:bg-[#111111] ${
            activeSection === section && "!brightness-100 bg-[#111111]"
          }`}
        >
          <Image
            src={`/${section}.png`}
            width={22}
            height={22}
            alt={`${section} image`}
            loading="lazy"
          />
          <p className="text-base lg:text-lg">{section}</p>
        </button>
      ))}
    </div>
  );
}
