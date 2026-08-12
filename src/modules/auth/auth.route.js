import { Router } from "express";

import * as authController from "./auth.controller.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

import { validate } from "../../../middleware/validate.middleware.js";
import verifyToken from "../../../middleware/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/me", verifyToken, authController.getCurrentUser);
router.post("/logout", verifyToken, authController.logout);

export default router;
