
import nodemailer from "nodemailer"
import { verificationTokenEmailTemplate } from "../templates/email-templates";
import { config } from "../config/app-config";


export const sendEmailVerification = async (to: string, subject: string, verificationToken: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: config.SMTP_USER,
            pass: config.SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `"Hello Rahem" <${config.SMTP_USER}>`, // اسم المرسل
        to,
        subject,
        html: verificationTokenEmailTemplate.replace(
            "{verificationToken}",
            verificationToken)
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);
}