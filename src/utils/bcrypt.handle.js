import { hash, genSaltSync, compareSync } from "bcryptjs";

export const encrypt = async (password) => {
  const salt = genSaltSync();
  const passwordHash = await hash(password, salt);
  return passwordHash;
};

export const verifiedPassword = (password, passwordHash) =>
  compareSync(password, passwordHash);
