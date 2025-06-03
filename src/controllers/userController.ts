import * as services from "../services/userServices.js";
import { sendVerifyEmailLink } from "../services/emailServices.js";


export const createNewUser = async (req, res) => {
    const { firstname, lastname, username, phone_number, email, password, confirmPassword } = req.body;
    const {emailToken, emailTokenExpires} = services.generateVerifyEmailToken();

    try {
        const user = await services.createNewUser(firstname, lastname, username, phone_number, email, password, emailToken, emailTokenExpires);

        // Send email verification link
        try {
            await sendVerifyEmailLink(email, emailToken);
        } catch (emailerror) {
            const updatedUser = await services.updateUser(firstname, lastname, username, phone_number, email, password, null, null, user.id);
            
            return res.status(201).json({ message: "User created but unable to send verification link. Please, make sure you verify your email", error: emailerror.message });
        }

        res.status(201).json({ message: "User created. A verification link has been sent to your email, Click it to verrify your email" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getUser = async (req, res) => {
    const userId = req.user
    try {
        const user = await services.getUser(userId);
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
export const updateUser = async (req, res) => {
    const userId = req.user
    const { firstname, lastname, username, phone_number, email, password, confirmPassword } = req.body;

    try {
        const updatedUser = await services.updateUser(firstname, lastname, username, phone_number, email, password, null, null, userId);
        res.clearCookie("jwtToken");
        res.status(200).json({ message: "User updated, Please, log in again", updatedUser })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const deleteUser = async (req, res) => {
    const UserId = req.user
    try {
        const user = await services.deleteUser(UserId);
        res.clearCookie("jwtToken");
        res.status(200).json({ message: "User deleted" })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const verifyEmail = await services.verifyEmail(token);

        if (!verifyEmail) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        res.status(200).json({ message: "Email verified" })
    } catch (error) {
        res.status(400).json({ error: error.message }) 
    }
}

export const createNewProfile = async (req, res) => {
    const UserId = req.user
    const { gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight } = req.body;
    try {
        const userProfile = await services.createNewProfile(gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight, UserId )
        res.status(201).json({ message: "Profile created", userProfile })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const getUserProfile = async (req, res) => {
    const UserId = req.user
    try {
        const profile = await services.getUserProfile(UserId);
        if (profile === null) {
            return res.status(400).json({message: "Profile not found"})
        }
        res.status(200).json(profile)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const updateUserProfile = async (req, res) => {
    const UserId = req.user
    const { gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight } = req.body;

    try {
        const updateProfile = await services.updateProfile(gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight, UserId)
        res.status(200).json({ message: "Profile updated", updateProfile })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}