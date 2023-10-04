import { Router } from "express";
import postsRouter from "./postsRouter";
import usersRouter from "./usersRouter";
import commentsRouter from "./commentsRouter";
import reactionsRouter from "./reactionsRouter";

const router = Router();

router.get("/", (req, res) => {
  res.send("API")
})
router.use("/posts", postsRouter);
router.use("/users", usersRouter);
router.use("/comments", commentsRouter);
router.use("/reactions", reactionsRouter);

export default router;