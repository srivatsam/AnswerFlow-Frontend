"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";

export const addDbData = async (formData: FormData, botId: string) => {
  console.log(formData);
  const type = formData.get("type") == "mongodb" ? "mongodb" : "mysql";
  const username = formData.get("userName");
  const password = formData.get("password");
  const host = formData.get("host");
  const port = formData.get("port");
  const db_name = formData.get("dbName");
  const prefix =
    formData.get("type") === "mongodb"
      ? "mongodb"
      : formData.get("type") === "mysql"
      ? "mysql"
      : "postgres";

  const name = `${prefix}://${username}:${password}@${host}:${port}/${db_name}`;
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
        type: type,
        name: name,
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
