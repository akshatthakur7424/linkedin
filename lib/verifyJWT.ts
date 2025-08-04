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

export const verifyJWTGetID = (
  requestToken: string,
  securityKey: string
): string | null => {
  try {
    const payload = jwt.verify(requestToken, securityKey) as { id: string };
    console.log("ID extracted from JWT:", payload.id);
    return payload.id;
  } catch (error) {
    console.error("Invalid JWT:", error);
    return null;
  }
};

