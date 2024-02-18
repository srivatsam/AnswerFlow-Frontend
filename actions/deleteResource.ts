"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";

export const deleteResource = async (botId: string, resourceID: string) => {
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clshq8clq00001equez0kcmz3";
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
    throw new Error(`${responseData.message}`);
  } else {
    revalidateTag("resources");
    return {
      success: "Resource Deleted Successfully",
      data: responseData.resources,
    };
  }
};
