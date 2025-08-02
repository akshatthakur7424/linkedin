import jwt from "jsonwebtoken";

export const verifyJWT = (
  requestToken: string,
  securityKey: string
): string | null => {
  try {
    const payload = jwt.verify(requestToken, securityKey) as { email: string };
    console.log("Email extracted from JWT:", payload.email);
    return payload.email;
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
};
