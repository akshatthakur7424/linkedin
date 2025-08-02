import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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


// import { Resend } from 'resend';

// export const sendEmail = async (
//   email: string,
//   otpNumber: number
// ): Promise<void> => {
//   try {
//     const apiKey = process.env.RESEND_API_KEY; 

//     if (!apiKey) {
//       throw new Error("Missing RESEND_API_KEY in environment variables.");
//     }

//     const resend = new Resend(apiKey);

//     const response = await resend.emails.send({
//       from: 'noreply@linkedin.com', 
//       to: email,
//       subject: 'Email Verification Code',
//       html: `<p>Your email verification code is: <strong>${otpNumber}</strong></p>`,
//     });

//     console.log("Email sent:", response);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

