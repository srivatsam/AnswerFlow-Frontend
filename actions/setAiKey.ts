"use server";
export const setAiKey = async (formData: FormData) => {
  try {
    const response = await fetch(
      `http://ec2-13-127-192-129.ap-south-1.compute.amazonaws.com/update_user/4`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          openai_api_key: formData.get("aiKey"),
        }),
      }
    );

    const responseData = await response.json();
    // console.log(responseData);
    if (responseData.status == "error") {
      throw new Error(`${responseData.message}`);
    }
    return { success: "AI Key Added" };
  } catch (error) {
    return { error: "Some Thing Sent Wrong" };
  }
};
