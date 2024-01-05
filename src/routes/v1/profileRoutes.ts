import { Router } from "express";
import { 
  myProfile
} from "@controllers/users/index";
import authMiddleware from "@middlewares/authMiddleware";

const router = Router();

router.get("/me", authMiddleware, myProfile);

export default router;