import { Router } from "express";
import { 
  listData,
  detailData,
  createData,
  updateData
} from "@controllers/users/index";
import { usersSchema } from "@controllers/users/users.validation";
import authMiddleware from "@middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, listData);
router.get("/:id", authMiddleware, detailData);
router.post("/", authMiddleware, usersSchema, createData);
router.put("/:id", authMiddleware, usersSchema, updateData);

export default router;