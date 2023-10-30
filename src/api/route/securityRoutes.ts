import express, { Request, Response } from "express";
import { SecurityController } from "../controllers/securityController";
const router = express.Router();

router.post("/api/registerUser", async (req: Request, res: Response) => {
  const { message, error } = await SecurityController.createUser(req);
  //Check for error
  if (error) return res.status(500).send("Failed to create a user");
  return res.status(201).send(message);
});

export { router as userRouter };
