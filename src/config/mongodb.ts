import mongoose from "mongoose";
import { env } from "./env.js";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(env.mongodb.uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};
