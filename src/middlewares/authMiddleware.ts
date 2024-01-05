import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response";
import dotenv from "dotenv";
import { UserPayload } from "@root/global";

dotenv.config();

const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(400).json(errorResponse("LOGIN NEEDED!"));
    }

    const payload = jwt.verify(token, process.env.JWTSECRET!) as UserPayload;
    req.currentUser = payload;

    next();
  } catch (err) {
    return res.status(401).json(errorResponse("Authentication failed"));
  }
};

export default requireAuth;
