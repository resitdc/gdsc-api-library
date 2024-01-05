import { Router } from "express";
import { 
  listData,
  detailData,
  deleteData
} from "@controllers/books/index";
import authMiddleware from "@middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, listData);
router.get("/:id", authMiddleware, detailData);
router.delete("/:id", authMiddleware, deleteData);

export default router;