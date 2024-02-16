type userType = {
  id: string;
  name: string | null;
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
