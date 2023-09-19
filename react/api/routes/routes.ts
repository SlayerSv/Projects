import { Router } from "express";
import postsRouter from "./postsRouter";
import usersRouter from "./usersRouter";

const router = Router();

router.get("/", (req, res) => {
  res.send("API")
})
router.use("/posts", postsRouter);
router.use("/users", usersRouter);

export default router;