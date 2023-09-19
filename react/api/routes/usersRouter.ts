import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("USERS")
});
router.get("/:id", (req, res) => {
  res.send(`USER ${req.params.id}`)
});

export default router;