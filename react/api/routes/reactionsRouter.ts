import { Router } from "express";
import ReactionController from "../controllers/ReactionController";
import ReactionPostController from "../controllers/ReactionPostController";
import ReactionCommentController from "../controllers/ReactionCommentController";

const router = Router();

router.get("/", ReactionController.getAll);
router.post("/", ReactionController.create);
router.patch("/", ReactionController.update);
router.delete("/", ReactionController.delete);

router.get("/", ReactionController.getAll);
router.post("/post", ReactionPostController.create);
router.post("/comment", ReactionCommentController.create);

export default router;