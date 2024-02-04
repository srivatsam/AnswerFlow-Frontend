"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";

export const deleteResource = async (botId: string, resourceID: string) => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "cls4l3i1b00008tqrll9og6d4";
  const response = await fetch(
    `${APIBACKEND}/delete_resource/${userId}/${botId}/${resourceID}`,
    {
      method: "DELETE",
    }
  );

  const responseData = await response.json();
  console.log(responseData);
  if (responseData.status == "error") {
    console.log(responseData.message);
    throw new Error(`ERROR FROM SERVER :${responseData.message}`);
  }
  revalidateTag("resources");
  return {
    success: "Resource Deleted Successfully",
    data: responseData.resources,
  };
};
