import { Router } from "express";
import PostController from "../controllers/PostController";

const router = Router();

router.get("/", PostController.getAll);
router.get("/:id", PostController.getOne);

router.post("/", PostController.create);
router.patch("/", PostController.update);
router.delete("/", PostController.delete);

export default router;