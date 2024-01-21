import Image from "next/image";
import Upgrade from "./_components/Upgrade";
import UserItem from "./_components/UserItem";

import { Bots } from "./_components/botSelection/Bots";

function NavBar() {
  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex gap-6 items-center">
        <div className="w-[300px]">
          <Image src={"/logo.png"} width={200} height={60} alt="logo png" />
        </div>
        <Bots />
      </div>
      <div className="flex gap-6">
        <Upgrade />
        <UserItem />
      </div>
    </div>
  );
}

export default NavBar;
