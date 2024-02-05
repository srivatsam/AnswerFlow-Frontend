"use server";
import { auth } from "@/auth";
import { APIBACKEND } from "@/utils/constData";
import { revalidateTag } from "next/cache";

export const addDbData = async (formData: FormData, botId: string) => {
  console.log(formData);
  const type = formData.get("type") == "mongo" ? "mongo" : "mysql";
  const username = formData.get("userName");
  const password = formData.get("password");
  const host = formData.get("host");
  const port = formData.get("port");
  const db_name = formData.get("dbName");
  const prefix =
    type === "mongo" ? "mongodb" : type === "mysql" ? "mysql" : "postgres";

  const name = `${prefix}://${username}:${password}@${host}:${port}/${db_name}`;
  const session = await auth();
  const userId =
    process.env.NODE_ENV == "production"
      ? session?.user.id
      : "cls4l3i1b00008tqrll9og6d4";
  const response = await fetch(
    `${APIBACKEND}/create_resource/${userId}/${botId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "mysql",
        name: "postgresql://postgres:yassine@localhost:5432/app",
      }),
    }
  );
  const responseData = await response.json();
  if (responseData.status == "error") {
    console.error(responseData.message);
    throw new Error(`ERROR FROM SERVER :${responseData.message}`);
  }
  revalidateTag("resources");
  return { success: "Data Added Successfully" };
};
