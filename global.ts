import { Request } from "express";

export interface UserPayload {
  id: string;
  role: string;
  username: string;
  email: string;
  name: string;
  isVerified: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload | undefined;
    }
  }
}