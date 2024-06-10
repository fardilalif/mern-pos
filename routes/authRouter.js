import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../middlewares/validationMiddleware.js";
const router = express.Router();

router.post("/register", validateRegisterInput, register);

router.post("/login", validateLoginInput, login);

router.get("/logout", logout);

export default router;
