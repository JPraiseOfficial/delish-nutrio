import dotenv from "dotenv";
import { mongo } from "mongoose";

dotenv.config();

function getEnvVar(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Missing required env variable: ${key}`);
  }
  return value!;
}

export const env = {
  port: Number(getEnvVar("PORT")),
  frontendUrl: getEnvVar("FRONTEND_URL"),

  mysqldb: {
    name: getEnvVar("DB_NAME"),
    host: getEnvVar("DB_HOST"),
    user: getEnvVar("DB_USER"),
    password: getEnvVar("DB_PASS"),
    port: Number(getEnvVar("DB_PORT")),
  },

  mongodb: {
    uri: getEnvVar("MONGO_URI")
  },

  jwt: {
    secret: getEnvVar("JWT_SECRET"),
    expiration: getEnvVar("JWT_EXPIRATION", false) || "1d",
  },
  
  email: {
    service: getEnvVar("EMAIL_SERVICE"),
    host: getEnvVar("EMAIL_HOST"),
    port: Number(getEnvVar("EMAIL_PORT")),
    user: getEnvVar("EMAIL_USER"),
    pass: getEnvVar("EMAIL_PASS"),
  },
};
