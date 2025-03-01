import { getUserData } from "@/actions/getUserData";
import { $Enums } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export function UserData() {
  const [user, setUser] = useState<userType>();
  useEffect(() => {
    const getUser = async () => {
      const user = await getUserData();
      if (user) setUser(user);
    };
    getUser();
  }, []);

  if (user) {
    return (
      <div className="flex justify-between items-center gap-2 py-2 lg:px-4 bg-[#1B1B1B] rounded-[10px] cursor-pointer lg:w-[250px]">
        <div className="flex gap-2 items-center justify-start w-[80%]">
          <div className="w-[32px] h-[32px] rounded-full overflow-hidden shrink-0">
            <Image
              src={user.image || "/profile.jpg"}
              width={32}
              height={32}
              alt="user image"
            />
          </div>
          <h1 className="font-medium capitalize whitespace-nowrap text-ellipsis overflow-hidden w-[100%] text-start hidden lg:block">
            {`${user?.firstName} ${user?.lastName}` || "user name"}
          </h1>
        </div>
        <Image src={"/downArrow.png"} alt="user image" width={25} height={25} />
      </div>
    );
  } else {
    return (
      <div className="flex justify-between items-center py-2 px-4 bg-[#1B1B1B] rounded-[10px] w-[80px] lg:w-[250px] h-[48] ">
        <div className="flex gap-2 items-center w-[85%]">
          <div className="w-[32px] h-[32px] bg-[#303030] rounded-full"></div>
          <div className="w-[70%] h-[24px] bg-[#303030] rounded-[10px] hidden"></div>
        </div>
        <div className="w-[10%] h-[27px] bg-[#303030]  rounded-[10px]"></div>
      </div>
    );
  }
}
