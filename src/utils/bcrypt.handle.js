import pkg from "bcryptjs";
const { hash, genSaltSync, compareSync } = pkg;

export const encrypt = async (password) => {
  const salt = genSaltSync();
  const passwordHash = await hash(password, salt);
  return passwordHash;
};

export const verifiedPassword = (password, passwordHash) =>
  compareSync(password, passwordHash);
