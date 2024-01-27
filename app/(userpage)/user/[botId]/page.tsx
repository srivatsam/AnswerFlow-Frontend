import { getUserPlan } from "@/actions/getUserPlan";
import { Sections } from "./_components/Sections";
import { APIBACKEND } from "@/utils/constData";
import { getBotResources } from "@/actions/getBotResources";
import { revalidateTag } from "next/cache";

type props = {
  params: {
    botId: string;
  };
};
const getBotData = async (botId: string) => {
  "use server";
  try {
    const response = await fetch(`${APIBACKEND}/get_bot/${botId}`, {
      method: "GET",
    });
    const data = await response.json();

    if (data.status == "error") {
      throw new Error(`ERROR FROM SERVER :${data.message}`);
    }
    revalidateTag("bot");
    return data.bot;
  } catch (error) {
    console.error(error);
    return null;
  }
};
async function Page({ params }: props) {
  const botData = await getBotData(params.botId);
  const userPlan = (await getUserPlan()).userPlan;
  const botResources = await getBotResources(params.botId);

  return (
    <Sections
      botData={botData}
      userPlan={userPlan}
      botResources={botResources}
    />
  );
}

export default Page;
