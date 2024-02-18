"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";

export const addUrlData = async (formData: FormData, botId: string) => {
  const isFull = formData.get("allPages") ? "import all pages" : undefined;
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "clshq8clq00001equez0kcmz3";
  const response = await fetch(
    `${APIBACKEND}/create_resource/${userId}/${botId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "url",
        name: formData.get("link"),
        isFull,
      }),
    }
  );
  const responseData = await response.json();
  if (responseData.status == "error") {
    console.error(responseData.message);
    throw new Error(`${responseData.message}`);
  } else {
    revalidateTag("resources");
    return { success: "Data Added Successfully" };
  }
};
