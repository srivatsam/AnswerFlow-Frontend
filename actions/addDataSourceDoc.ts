"use server";
export const addDataSourceDoc = async (formData: FormData) => {
  const fileData = formData.get("file") as File;
  // console.log(fileData.type.split("/")[1]);
  formData.append("type", fileData.type.split("/")[1]);
  try {
    const response = await fetch(
      `http://ec2-13-127-192-129.ap-south-1.compute.amazonaws.com/create_resource/1/1`,
      {
        method: "POST",
        body: formData,
      }
    );
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status == "error") {
      throw new Error(`${responseData.message}`);
    }
    return { success: "Bot Created" };
  } catch (error) {
    return { error: "Some Thing Sent Wrong" };
  }
};
