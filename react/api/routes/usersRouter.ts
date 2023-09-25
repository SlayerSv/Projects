import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.get("/", (req, res) => {
  res.send("USERS")
});
router.get("/:id", (req, res) => {
  res.send(`USER ${req.params.id}`)
});
router.post("/signup", UserController.signup.bind(UserController));
router.post("/signin", )

export default router;