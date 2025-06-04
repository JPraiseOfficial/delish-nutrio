import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
    host: env.email.host,
    port: env.email.port,
    secure: env.email.port === 465,
    auth: {
        user: env.email.user,
        pass: env.email.pass
    }
} as SMTPTransport.Options);

export const sendVerifyEmailLink = async (email: string, token: string) => {
    const verifyEmailLink = `${env.frontendUrl}/verifyEmail.html?token=${token}`;

    const message = {
        from: 'Delish Nutrio',
        to: email,
        subject: "Verify Your Email",
        html: `<p>Thank you for registering with Delish Nutrio! <br> Click the link below to confirm your email address</p> <p><a href='${verifyEmailLink}'>${verifyEmailLink}</a><br><b>Please Note that this link will expire in the next 1 Hour!</b></p>`,
    }

    await transporter.sendMail(message);
};

export const sendPasswordResetLink = async (email: string, token: string) => {
    const resetURL = `${env.frontendUrl}/resetpassword.html?token=${token}`;

    const message = {
        from: 'Delish Nutrio',
        to: email,
        subject: "Reset Your Password",
        html: `
        <h1>You have requested a password reset</h1>
        <p>Please click on the following link to reset your password:</p>
        <a href="${resetURL}" clicktracking=off>${resetURL}</a>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <p><b>This link will expire in 10 minutes.</b></p>
        `,
    }

    await transporter.sendMail(message);
};