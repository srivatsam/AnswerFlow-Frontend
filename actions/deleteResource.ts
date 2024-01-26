"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";

export const deleteResource = async (botId: string, resourceID: string) => {
  const session = await auth();
  const userId = process.env.NODE_ENV == "production" ? session?.user.id : "1";
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
  return {
    success: "Resource Deleted Successfully",
    data: responseData.resources,
  };
};
