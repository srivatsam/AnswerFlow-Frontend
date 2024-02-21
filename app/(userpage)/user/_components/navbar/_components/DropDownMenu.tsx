"use client";

import { useToggle } from "@/hooks/useToggle";
import Image from "next/image";

export function DropDownMenu() {
  const { toggle, setToggle } = useToggle((state) => state);
  return (
    <div>
      <Image
        onClick={() => setToggle(true)}
        src={"/menu.png"}
        width={22}
        height={22}
        alt="menu png"
        className="cursor-pointer w-[20px] h-[20px]"
      />
    </div>
  );
}
