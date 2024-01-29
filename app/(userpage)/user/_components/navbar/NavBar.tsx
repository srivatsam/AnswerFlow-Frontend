import Image from "next/image";
import Upgrade from "./_components/Upgrade";
import UserItem from "./_components/UserItem";

import { Bots } from "./_components/botSelection/Bots";
import { Suspense } from "react";

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
    <div className="flex justify-between w-full items-center">
      <div className="flex gap-6 items-center">
        <div className="w-[300px]">
          <Image src={"/logo.png"} width={200} height={60} alt="logo png" />
        </div>
        <Suspense fallback={<LoadingBots />}>
          <Bots />
        </Suspense>
      </div>
      <div className="flex gap-6">
        <Upgrade />
        <UserItem />
      </div>
    </div>
  );
}

export default NavBar;
