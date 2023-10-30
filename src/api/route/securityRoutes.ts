import express, { Request, Response } from "express";
import { SecurityController } from "../controllers/securityController";
const router = express.Router();

router.post("/api/registerUser", async (req: Request, res: Response) => {
  const response = SecurityController.createUser(req);
  return res.status(201).send(response);
});

export { router as userRouter };
