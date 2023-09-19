import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("POSTS")
});
router.get("/:id", (req, res) => {
  res.send(`POST ${req.params.id}`)
});

export default router;