import * as services from "../services/userServices.js";
import { sendVerifyEmailLink } from "../services/emailServices.js";
import e, { Request, Response } from "express";

export const createNewUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    firstname,
    lastname,
    username,
    phone_number,
    email,
    password,
    confirmPassword,
  } = req.body;
  const { emailToken, emailTokenExpires } = services.generateVerifyEmailToken();

  try {
    const user = await services.createNewUser({
      firstname,
      lastname,
      username,
      phone_number,
      email,
      password,
      verifyEmailToken: emailToken,
      verifyEmailTokenExpires: emailTokenExpires,
    });

    // Send email verification link
    try {
      await sendVerifyEmailLink(email, emailToken);
    } catch (emailerror) {
      const updatedUser = await services.updateUser({
        verifyEmailToken: null,
        verifyEmailTokenExpires: null,
        userId: user.id,
      });

      let errorMsg = "Unknown error";
      if (emailerror instanceof Error) {
        errorMsg = emailerror.message;
      }

      res
        .status(201)
        .json({
          message:
            "User created but unable to send verification link. Please, make sure you verify your email",
          error: errorMsg,
        });
      return;
    }

    res
      .status(201)
      .json({
        message:
          "User created. A verification link has been sent to your email, Click it to verrify your email",
      });
  } catch (error) {
    let errorMsg = "Unknown error";
    if (error instanceof Error) {
      errorMsg = error.message;
    }
    res.status(400).json({ error: errorMsg });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.user as number;
  try {
    const user = await services.getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      res.status(404).json({ error: error.message });
      return;
    }
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
      return;
    }
  }
};
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.user as number;
  const {
    firstname,
    lastname,
    username,
    phone_number,
    email,
    password,
    confirmPassword,
  } = req.body;

  try {
    const updatedUser = await services.updateUser({
      firstname,
      lastname,
      username,
      phone_number,
      email,
      password,
      userId,
    });
    res.clearCookie("jwtToken");
    res
      .status(200)
      .json({ message: "User updated, Please, log in again", updatedUser });
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      res.status(404).json({ error: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const UserId = req.user as number;
  try {
    const user = await services.deleteUser(UserId);
    res.clearCookie("jwtToken");
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    if (error instanceof Error && error.message === "User not found") {
      res.status(404).json({ error: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.params;
  try {
    const verifyEmail = await services.verifyEmail(token);

    if (!verifyEmail) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    res.status(200).json({ message: "Email verified" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};

export const createNewProfile = async (req: Request, res: Response) => {
  const UserId = req.user as number;
  const {
    gender,
    age,
    country,
    region,
    dietary_preferences,
    health_goals,
    activity_levels,
    allergies,
    medical_condition,
    height,
    weight,
  } = req.body;
  try {
    const userProfile = await services.createNewProfile({
      gender,
      age,
      country,
      region,
      dietary_preferences,
      health_goals,
      activity_levels,
      allergies,
      medical_condition,
      height,
      weight,
      UserId,
    });
    res.status(201).json({ message: "Profile created", userProfile });
  } catch (error) {
    if (error instanceof Error && error.message === "Profile already exists") {
      res.status(400).json({ error: error.message });
      return;
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  const UserId = req.user as number;
  try {
    const profile = await services.getUserProfile(UserId);
    if (!profile) {
      res.status(404).json({ error: "User has no profile" });
      return;
    }
    res.status(200).json(profile);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const UserId = req.user as number;
  const {
    gender,
    age,
    country,
    region,
    dietary_preferences,
    health_goals,
    activity_levels,
    allergies,
    medical_condition,
    height,
    weight,
  } = req.body;

  try {
    const updateProfile = await services.updateProfile({
      gender,
      age,
      country,
      region,
      dietary_preferences,
      health_goals,
      activity_levels,
      allergies,
      medical_condition,
      height,
      weight,
      UserId,
    });
    res.status(200).json({ message: "Profile updated", updateProfile });
  } catch (error) {
    if (error instanceof Error && error.message === "User has no profile") {
      res.status(404).json({ error: error.message });
    } else if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    }
  }
};
