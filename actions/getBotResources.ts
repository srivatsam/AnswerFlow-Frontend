import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";

export const getBotResources = async (botId: string) => {
  const session = await auth();
  const userId = process.env.NODE_ENV == "production" ? session?.user.id : "1";
  const response = await fetch(`${APIBACKEND}/get_resources/userId/${botId}`, {
    method: "GET",
  });

  const responseData = await response.json();
  console.log(responseData);
  if (responseData.status == "error") {
    console.log(responseData.message);
    throw new Error(`ERROR FROM SERVER :${responseData.message}`);
  }
  return { success: "Bot Created Successfully", data: responseData.resources };
};
