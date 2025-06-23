import jwt, { JwtPayload } from "jsonwebtoken"
import type { Request, Response, NextFunction } from "express";
import { env } from "../config/env.js";

const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies.jwtToken;

    try {
        if (!token) {
            res.status(401).json({ message: "Access denied" })
            return;
        }

        const decodedToken = jwt.verify(token, env.jwt.secret) as JwtPayload;
        req.user = decodedToken.userID;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
}

export default auth;