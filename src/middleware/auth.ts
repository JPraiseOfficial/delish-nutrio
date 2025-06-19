import jwt, { JwtPayload } from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.jwtToken;

    try {
        if (!token) {
            return res.status(401).json({ message: "Access denied" })
        }

        const decodedToken = jwt.verify(token, env.jwt.secret) as JwtPayload;
        req.user = decodedToken.userID;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export default auth;