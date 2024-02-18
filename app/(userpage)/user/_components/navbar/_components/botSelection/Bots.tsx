import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import BotSelection from "./BotSelection";
const getBots = async (id: string) => {
  const userId =
    process.env.NODE_ENV == "production" ? id : "clshq8clq00001equez0kcmz3";
  try {
    const response = await fetch(`${APIBACKEND}/get_bots/${userId}`, {
      method: "GET",
    });
    const data = await response.json();
    if (data.status == "error") {
      throw new Error(`ERROR FROM SERVER :${data.message}`);
    }
    return data.bots;
  } catch (error) {
    console.error(error);
    return null;
  }
};
export async function Bots() {
  const session = await auth();
  const bots = await getBots(session?.user.id as string);

  return <BotSelection bots={bots} />;
}
