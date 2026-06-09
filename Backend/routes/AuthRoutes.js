import { Router } from "express";
import { validateSignUp } from "../middleware/validateSignUp.js";
import { login, logout, signup } from "../controller/AuthController.js";

const router = Router();

router.post("/signup", validateSignUp, signup);
router.post("/login", validateSignUp, login);
router.post("/logout", logout);

export default router;