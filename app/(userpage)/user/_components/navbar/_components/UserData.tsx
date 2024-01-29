import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export function UserData() {
  const session = useSession();
  if (session.data) {
    return (
      <div className="flex justify-between items-center gap-2 py-2 px-4 bg-[#1B1B1B] rounded-[10px] cursor-pointer w-[250px]">
        <div className="flex gap-2 items-center justify-start w-[80%]">
          <Image
            src={session.data.user.image || "/profile.jpg"}
            alt="user image"
            width={30}
            height={30}
            className="rounded-full "
          />
          <h1 className="font-medium capitalize whitespace-nowrap text-ellipsis overflow-hidden w-[100%] text-start">
            {session.data.user.name || "user name"}
          </h1>
        </div>
        <Image src={"/downArrow.png"} alt="user image" width={25} height={25} />
      </div>
    );
  }
  if (session.data == null) {
    return (
      <div className="flex justify-between items-center py-2 px-4 bg-[#1B1B1B] rounded-[10px] w-[250px] h-[48] ">
        <div className="flex gap-2 items-center w-[85%]">
          <div className="w-[32px] h-[32px] bg-[#303030]  rounded-full"></div>
          <div className="w-[70%] h-[24px] bg-[#303030]  rounded-[10px]"></div>
        </div>
        <div className="w-[10%] h-[27px] bg-[#303030]  rounded-[10px]"></div>
      </div>
    );
  }
}
