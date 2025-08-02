import jwt from "jsonwebtoken";

export const generateJWT = (userEmail: string): string | undefined => {
  try {
    const payload = { email: userEmail };
    const securityKey = process.env.SECURITY_KEY;

    if (!securityKey) {
      throw new Error("JWT secret (SECURITY_KEY) is not defined.");
    }

    const token = jwt.sign(payload, securityKey, { expiresIn: "1d" });
    console.log("Generated JWT:", token);
    return token;
  } catch (error) {
    console.error("Error generating JWT:", error);
    return undefined;
  }
};
