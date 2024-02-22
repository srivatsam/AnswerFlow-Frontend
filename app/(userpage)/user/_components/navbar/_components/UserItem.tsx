"use client";
import React, { Suspense, useState } from "react";
import Image from "next/image";

import { signOut, useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useActiveSection } from "@/hooks/use-active-section";

import { userItems } from "@/utils/constData";
import { useSteps } from "@/hooks/use-steps";
import { UserData } from "./UserData";

function UserItem() {
  const setActiveSection = useActiveSection((state) => state.setActiveSection);
  const setActiveStep = useSteps((state) => state.setActiveStep);

  const [toggle, setToggle] = useState(false);
  const route = useRouter();

  return (
    <>
      <div className="relative z-[4]">
        <button onClick={() => setToggle((prev) => !prev)}>
          <UserData />
        </button>
        {toggle && (
          <div className="absolute w-[200px] lg:w-[stretch] top-[120%] right-0 lg:left-0 py-2 px-4 bg-[#1B1B1B] rounded-[10px] flex flex-col items-start">
            {userItems.map((item, i) =>
              item !== "logout" ? (
                <button
                  key={i}
                  onClick={() => {
                    setToggle(false);
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
                    localStorage.removeItem("botId");
                    setToggle(false);
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

export default UserItem;
