import sgMail from "@sendgrid/mail";
import { config } from "../config/app-config";


sgMail.setApiKey(config.SEND_GRID_API);
console.log(config.SEND_GRID_API)

const fromEmail = config.FROM_EMAIL;

export const sendEmail = async (to: string, subject: string, html: string) => {
    const msg = {
        to,
        from: `TaskHub <${fromEmail}>`,
        subject,
        html,
    };

    try {
        await sgMail.send(msg);
        console.log("Email sent successfully");

        return true;
    } catch (error) {
        console.error("Error sending email:", error);

        return false;
    }
};