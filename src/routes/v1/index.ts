import { Router } from "express";
import usersRoutes from "./usersRoutes";
import authRoutes from "./authRoutes";
import booksRoutes from "./booksRoutes";
import profileRoutes from "./profileRoutes";

const router = Router();

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/books", booksRoutes);
router.use("/profile", profileRoutes);

export default router;
