import { Router } from "express";
import authController from "../../controllers/auth/auth.view.controller.js"

const router = Router();

router.get("/register", authController.registerForm);
router.post("/register", authController.register);

router.get("/login", authController.loginForm);
router.post("/login", authController.login);

router.get("/logout", authController.logout);

export default router;
