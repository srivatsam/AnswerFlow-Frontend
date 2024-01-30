"use server";

import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";

export const addDataSourceDoc = async (formData: FormData, botId: string) => {
  console.log(formData.get("file"));
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clrzn68tz0000pckk65117wnz";

  const response = await fetch(
    `${APIBACKEND}/create_resource/${userId}/${botId}`,
    {
      method: "POST",
      body: formData,
    }
  );
  const responseData = await response.json();
  console.log(responseData);

  if (responseData.status == "error") {
    console.error(responseData.message);
    throw new Error(`ERROR FROM SERVER :${responseData.message}`);
  }
  revalidateTag("resources");
  return { success: "Data Added Successfully" };
};
