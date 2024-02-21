import Image from "next/image";
import { SideBarSections } from "./_components/SideBarSections";
import { Usage } from "./_components/Usage";
import { Bots, getBots } from "../navbar/_components/botSelection/Bots";
import { auth } from "@/auth";
import BotSelection from "../navbar/_components/botSelection/BotSelection";
import { SideBarComponent } from "./SideBarComponent";
import { getUserUsage } from "@/actions/getUsage";

async function SideBar() {
  const session = await auth();
  const bots = await getBots(session?.user.id as string);
  const userUsage = await getUserUsage();
  return <SideBarComponent bots={bots} userUsage={userUsage} />;
}

export default SideBar;
