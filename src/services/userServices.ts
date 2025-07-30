import { User, UserProfile } from "../models/UserModels.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";
import type {
  CreateNewUser,
  retunedUser,
  UpdateUser,
  UserProfileAttributes,
} from "../types/userServices.types.js";

export const createNewUser = async (data: CreateNewUser) => {
  data.password = bcrypt.hashSync(data.password, 10);
  const user = await User.create({ ...data, isVerified: false });

  const userData: retunedUser = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    phone_number: user.phone_number,
    email: user.email,
  };
  return userData;
};

export const getUser = async (userId: number) => {
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found");
  }

  const userData: retunedUser = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    phone_number: user.phone_number,
    email: user.email,
  };
  return userData;
};

export const updateUser = async (data: UpdateUser) => {
  const user = await User.findOne({ where: { id: data.userId } });

  if (!user) {
    throw new Error("User not found");
  }
  if (data.password) {
    data.password = bcrypt.hashSync(data.password, 10);
  }
  const updatedUser = await user.update({ ...data });
  const userData: retunedUser = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    phone_number: user.phone_number,
    email: user.email,
  };
  return userData;
};

export const deleteUser = async (UserId: number) => {
  const user = await User.findOne({ where: { id: UserId } });
  if (!user) {
    throw new Error("User not found");
  }
  const deletedUser = await user.destroy();
};

export const generateVerifyEmailToken = () => {
  const emailToken = uuidv4();
  const emailTokenExpires = new Date(Date.now() + 60 * 60 * 1000);
  return { emailToken, emailTokenExpires };
};

export const verifyEmail = async (token: string) => {
  const user = await User.findOne({
    where: {
      verifyEmailToken: token,
      verifyEmailTokenExpires: { [Op.gt]: Date.now() },
    },
  });

  if (!user) return;

  const updatedUser = await user.update({
    isVerified: true,
    verifyEmailToken: null,
    verifyEmailTokenExpires: null,
  });
  return updatedUser;
};

export const createNewProfile = async (data: UserProfileAttributes) => {
  const user = await UserProfile.findOne({ where: { UserId: data.UserId } });
  if (user) {
    throw new Error("Profile already exists");
  }

  const profile = await UserProfile.create({ ...data });
  return profile;
};

export const getUserProfile = async (UserId: number) => {
  const profile = await UserProfile.findOne({ where: { UserId } });
  return profile;
};

export const updateProfile = async (data: UserProfileAttributes) => {
  const profile = await UserProfile.findOne({ where: { UserId: data.UserId } });
  if (!profile) {
    throw new Error("User has no profile");
  }
  const newProfile = await profile.update({ ...data });
  return newProfile;
};
