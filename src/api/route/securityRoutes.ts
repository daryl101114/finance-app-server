import express, { Request, Response } from "express";
import { SecurityController } from "../controllers/securityController";
const router = express.Router();

router.post("/api/registerUser", SecurityController.createUser);
router.post("/api/login", SecurityController.login);

export { router as userRouter };
