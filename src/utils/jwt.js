import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "OasdMt0E*TsadasdSW";

export const generateToken = async (uuid) => {
  const jwtToken = await jwt.sign({ uuid }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return jwtToken;
};

export const verifyToken = (jwtToken) => {
  const decoded = jwt.verify(jwtToken, JWT_SECRET);
  return decoded;
};