import nodemailer from "nodemailer";

export const sendEmail = async (
  email: string,
  otpNumber: number
): Promise<void> => {
  const ownerEmail = process.env.OWNER_EMAIL || "";
  const ownerEmailPassword = process.env.OWNER_EMAIL_PASSWORD || "";

  if (!ownerEmail || !ownerEmailPassword) {
    console.error("Email credentials are missing in environment variables.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ownerEmail,
      pass: ownerEmailPassword,
    },
  });

  const mailOptions = {
    from: ownerEmail,
    to: email,
    subject: "Email Verification",
    html: `<h3>Your OTP:</h3> <p>${otpNumber}</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
