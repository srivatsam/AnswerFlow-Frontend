"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";

export const getBotResources = async (botId: string) => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clshq8clq00001equez0kcmz3";
  const response = await fetch(
    `${APIBACKEND}/get_resources/${userId}/${botId}`,
    {
      method: "GET",
      next: { tags: ["resources"] },
    }
  );

  const responseData = await response.json();
  console.log(responseData);
  if (responseData.status == "error") {
    console.log(responseData.message);
    throw new Error(`${responseData.message}`);
  } else {
    return {
      success: "Get Resources Successfully",
      data: responseData.resources,
    };
  }
};
