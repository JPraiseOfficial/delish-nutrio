import { User } from "../models/UserModels.js";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendPasswordResetLink } from "../services/emailServices.js";
import { Request, Response } from "express";
import { env } from "../config/env.js";

export const generateJwtToken = (id: number, expiresIn?: string) => {
    return jwt.sign(
        { userID: id }, env.jwt.secret,
        { expiresIn: expiresIn || env.jwt.expiration })
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { emailOrPhone, password } = req.body;

    try {
        // check if field is empty
        if (!emailOrPhone || !password) {
            res.status(400).json({ message: "Please, fill in the required details" });
            return;
        }

        // check whether user used email or phone number
        let user
        if (isNaN(emailOrPhone)) {
            user = await User.findOne({ where: { email: emailOrPhone } })
        } else {
            user = await User.findOne({ where: { phone_number: emailOrPhone } });
        }

        if(!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return;
        }

        // check if password matches email/phone number
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (user && passwordCheck) {
            const token = generateJwtToken(user.id)
            res.cookie("jwtToken", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: "none",
                secure: true
            });
            res.status(200).json({ message: "Login successful" })
        } else {
            res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const logout = async (req: Request, res: Response) => {
    res.clearCookie("jwtToken");
    res.status(200).json({ message: "Logout successful" });
}

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const token = generateJwtToken(user.id, "10m");

        try {
            await sendPasswordResetLink(email, token);
        } catch (error) {
            res.status(500).json({ message: 'Email not sent, Please try again later', error });
        }

        res.status(200).json({ message: "Password reset link has been sent to your mail" });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    try {
        const decoded = jwt.verify(token, env.jwt.secret) as JwtPayload;
        const userId = decoded.userID;

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return
        } else {
        user.password = bcrypt.hashSync(password, 10);
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
        }

    } catch (error) {
        res.status(400).json({ message: "Invalid or expired token", error });

    }
}