import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `http://localhost:3000/auth/verify-email?token=${token}`; // CHANGE THIS LINK WHEN DEPLOYING BACKEND

  try {
    const { data, error } = await resend.emails.send({
      from: "noreply@compsa.queensu.ca",
      to: email,
      subject: "COMPSA App Email Verification",
      html: `
        <h2>Thank you for choosing to sign up for the official COMPSA App!</h2>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationLink}">${verificationLink}</a>
        <p>This link will expire in 15 minutes.</p>
      `,
    });

    if (error) throw error;
    console.log("Verification email sent:", data);
  } catch (err) {
    console.error("Error sending email:", err);
  }
}
