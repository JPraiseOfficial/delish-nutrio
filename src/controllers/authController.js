import { User } from "../models/UserModels.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { sendPasswordResetLink } from "../services/emailServices.js";

export const generateJwtToken = (id, expiresIn) => {
    return jwt.sign(
        { userID: id }, process.env.JWT_SECRET,
        { expiresIn: expiresIn || process.env.JWT_EXPIRATION })
}

export const login = async (req, res) => {
    const { emailOrPhone, password } = req.body;

    try {
        // check if field is empty
        if (!emailOrPhone || !password) {
            return res.status(400).json({ message: "Please, fill in the required details" });
        }

        // check whether user used email or phone number
        let user
        if (isNaN(emailOrPhone)) {
            user = await User.findOne({ where: { email: emailOrPhone } });
        } else {
            user = await User.findOne({ where: { phone_number: emailOrPhone } });
        }

        if(!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // check if password matches email/phone number
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (user && passwordCheck) {
            const token = generateJwtToken(user.id)
            res.cookie("jwtToken", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: "None",
                secure: true
            });
            return res.status(200).json({ message: "Login successful" })
        } else {
            return res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
}

export const logout = async (req, res) => {
    res.clearCookie("jwtToken");
    res.status(200).json({ message: "Logout successful" });
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = generateJwtToken(user.id, "10m");

        try {
            await sendPasswordResetLink(email, token);
        } catch (error) {
            return res.status(500).json({ message: 'Email not sent, Please try again later', error });
        }

        return res.status(200).json({ message: "Password reset link has been sent to your mail" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userID;

        const user = await User.findOne({ where: { id: userId } });
        user.password = bcrypt.hashSync(password, 10);
        await user.save();

        return res.status(200).json({ message: "Password reset successful" });

    } catch (error) {
        return res.status(400).json({ message: "Invalid or expired token", error });

    }
}