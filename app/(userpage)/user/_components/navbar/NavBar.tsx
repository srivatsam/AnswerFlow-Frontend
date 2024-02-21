import Image from "next/image";
import Upgrade from "./_components/Upgrade";
import UserItem from "./_components/UserItem";

import { Bots } from "./_components/botSelection/Bots";
import { Suspense } from "react";
import { DropDownMenu } from "./_components/DropDownMenu";

const LoadingBots = () => {
  return (
    <div className="flex justify-between items-center gap-10 py-2 px-4 bg-[#1B1B1B] rounded-[10px] w-[250px] ">
      <div className="w-[60%] h-[24px] bg-[#303030]  rounded-[10px]"></div>
      <div className="w-[10%] h-[27px] bg-[#303030]  rounded-[10px]"></div>
    </div>
  );
};
function NavBar() {
  return (
    <div className="flex justify-between w-full items-center bg-[#2a2a2a9c] px-4 py-1 lg:p-0 rounded-[10px] lg:rounded-[0px] lg:bg-transparent border-[0.5px] border-gray-400/50 lg:border-none">
      <div className="flex gap-6 items-center">
        <div className="block lg:hidden">
          <DropDownMenu />
        </div>
        <div className="hidden lg:block w-[280px]">
          <Image src={"/logo.png"} width={280} height={60} alt="logo png" />
        </div>
        <Suspense fallback={<LoadingBots />}>
          <div className="hidden lg:block">
            <Bots />
          </div>
        </Suspense>
      </div>
      <div className="flex gap-6 items-stretch">
        <div className="hidden lg:flex">
          <Upgrade />
        </div>
        <UserItem />
      </div>
    </div>
  );
}

export default NavBar;
