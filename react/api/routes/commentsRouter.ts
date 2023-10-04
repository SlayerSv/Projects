import { Router } from "express";
import CommentController from "../controllers/CommentController";

const router = Router();

router.get("/", CommentController.getAll);
router.post("/", CommentController.create);
router.patch("/", CommentController.update);
router.delete("/", CommentController.delete);

export default router;