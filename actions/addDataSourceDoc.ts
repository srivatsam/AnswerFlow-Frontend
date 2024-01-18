"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";

export const addDataSourceDoc = async (formData: FormData, botId: string) => {
  const session = await auth();
  const userId = process.env.NODE_ENV == "production" ? session?.user.id : "1";

  try {
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
      throw new Error(`${responseData.message}`);
    }
    return { success: "Data Added Successfully" };
  } catch (error) {
    return { error: "Something Sent Wrong" };
  }
};
