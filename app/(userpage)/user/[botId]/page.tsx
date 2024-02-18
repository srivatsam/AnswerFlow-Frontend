import { getUserPlan } from "@/actions/getUserPlan";
import { getBotResources } from "@/actions/getBotResources";
import { getBotData } from "@/actions/getBotData";

import { Sections } from "./_components/Sections";
import { getPastChat } from "@/actions/getPastChat";

type props = {
  params: {
    botId: string;
  };
};

async function Page({ params }: props) {
  const botData = await getBotData(params.botId);
  const pastChat = await getPastChat(params.botId);
  const userPlan = (await getUserPlan()).userPlan;
  const botResources = await getBotResources(params.botId);

  console.log("-------------------", botData);
  if (botData) {
    return (
      <Sections
        botData={botData}
        userPlan={userPlan}
        botResources={botResources}
        pastChat={pastChat}
      />
    );
  } else {
    return <p>bot not found</p>;
  }
}

export default Page;
