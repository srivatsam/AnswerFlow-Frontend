import { ChangePassword } from "./ChangePassword";
import { OpenAiKeyForm } from "./OpenAiKeyForm";
import { UpdateEmail } from "./UpdateEmail";

import { $Enums } from "@prisma/client";

type props = {
  userData: userDataType;
};
type userDataType = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  password: string | null;
  role: $Enums.UserRole;
  openai_api_key: string | null;
  plan_id: string | null;
};
export function UserDataForm({ userData }: props) {
  return (
    <>
      <div className="flex flex-col w-full bg-[#131313] rounded-[12px] p-12 gap-8">
        <UpdateEmail email={userData.email} />
        <ChangePassword password={userData.password} />
      </div>
      <OpenAiKeyForm openai_api_key={userData.openai_api_key} />
    </>
  );
}
