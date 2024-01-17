import db from "../db";

export const getUserByEmail = async (email: string) => {
  try {
    const exitUser = await db.user.findUnique({ where: { email } });
    return exitUser;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const exitUser = await db.user.findUnique({ where: { id } });
    return exitUser;
  } catch {
    return null;
  }
};
