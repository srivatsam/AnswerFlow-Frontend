"use client";
import React, { useState } from "react";
import Image from "next/image";

import { signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useActiveSection } from "@/hooks/use-active-section";

import { userItems } from "@/utils/constData";

function UserItem() {
  const setActiveSection = useActiveSection((state) => state.setActiveSection);
  const [toggle, setToggle] = useState(false);
  const route = useRouter();
  const session = useSession();

  return (
    <button
      onClick={() => setToggle((prev) => !prev)}
      className="flex justify-between items-center gap-10 py-2 px-4 bg-[#1B1B1B] rounded-[10px] cursor-pointer relative"
    >
      <div className="flex gap-2 items-center">
        <Image
          src={session.data?.user?.image || "/profile.jpg"}
          alt="user image"
          width={30}
          height={30}
          className="rounded-full "
        />
        <h1 className="font-medium">{session.data?.user?.name}</h1>
      </div>
      <Image src={"/downArrow.png"} alt="user image" width={25} height={25} />

      {toggle && (
        <div className="absolute w-[stretch] top-[120%] left-0 py-2 px-4 bg-[#1B1B1B] rounded-[10px] flex flex-col items-start">
          {userItems.map((item, i) =>
            item !== "logout" ? (
              <button
                key={i}
                onClick={() => {
                  route.push(`/user/${item}`);
                  setActiveSection("");
                }}
                className="flex justify-between gap-1 py-1 px-2 w-full capitalize"
              >
                <p>{item}</p>
                <Image
                  src={`/${item}.png`}
                  alt={`/${item} image`}
                  width={15}
                  height={15}
                />
              </button>
            ) : (
              <button
                key={i}
                onClick={() => {
                  signOut();
                }}
                className="flex justify-between gap-1 py-1 px-2 w-full capitalize"
              >
                <p>{item}</p>
                <Image
                  src={`/${item}.png`}
                  alt={`/${item} image`}
                  width={15}
                  height={15}
                />
              </button>
            )
          )}
        </div>
      )}
    </button>
  );
}

export default UserItem;
