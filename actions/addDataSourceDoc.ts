"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";

export const addDataSourceDoc = async (formData: FormData, botId: string) => {
  const session = await auth();
  const userId = process.env.NODE_ENV == "production" ? session?.user.id : "1";

  const response = await fetch(
    `${APIBACKEND}/create_resource/${userId}/${botId}`,
    {
      method: "POST",
      body: formData,
    }
  );
  const responseData = await response.json();
  // console.log(responseData);
  if (responseData.status == "error") {
    console.error(responseData.message);
    throw new Error(`ERROR FROM SERVER :${responseData.message}`);
  }
  return { success: "Data Added Successfully" };
};
