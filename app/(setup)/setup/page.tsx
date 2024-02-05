import { getUserBots } from "@/actions/getUserBots";
import Setup from "./_components/Setup";
import { getUserData } from "@/actions/getUserData";
import { getUserPlan } from "@/actions/getUserPlan";

async function page() {
  // const user = await getUserData();
  // const userBots = await getUserBots();
  // const userPlan = await getUserPlan();
  let hasOpenAIKey = false;
  let hasBots = false;
  let seatedPlan = false;
  // if (user?.openai_api_key !== "") {
  //   hasOpenAIKey = true;
  // }
  // if (userBots.bots) {
  //   hasBots = true;
  // }
  // if (userPlan.userPlan) {
  //   seatedPlan = true;
  // }
  return (
    <Setup
      seatedPlan={seatedPlan}
      hasOpenAIKey={hasOpenAIKey}
      hasBots={hasBots}
    />
  );
}

export default page;
