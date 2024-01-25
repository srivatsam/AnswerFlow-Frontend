import { Sections } from "./_components/Sections";
import { APIBACKEND } from "@/utils/constData";

type props = {
  params: {
    botId: string;
  };
};
const getBotData = async (botId: string) => {
  try {
    const response = await fetch(`${APIBACKEND}/get_bot/${botId}`, {
      method: "GET",
      cache: "no-cache",
    });
    const data = await response.json();

    if (data.status == "error") {
      throw new Error(`ERROR FROM SERVER :${data.message}`);
    }
    return data.bot;
  } catch (error) {
    console.error(error);
    return null;
  }
};
async function Page({ params }: props) {
  const botData = await getBotData(params.botId);
  return <Sections botData={botData} />;
}

export default Page;
