import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const getResendClient = () => {
  const apiKey = process.env.RESEND_EMAIL_API_KEY;
  if (!apiKey) throw new Error("Email is not configured. Set RESEND_EMAIL_API_KEY in the backend environment.");
  return new Resend(apiKey);
};

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await getResendClient().emails.send({
      from: "E-Commerce SaaS <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend Error:", error);
      throw new Error(error.message);
    }

    console.log("Email sent successfully:", data.id);

    return data;
  } catch (error) {
    console.error("Email Service Error:", error);
    throw error;
  }
};
