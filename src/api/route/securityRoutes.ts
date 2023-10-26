import express, { Request, Response } from "express";
import { User } from "../../model/user";

const router = express.Router();

router.post("/api/registerUser", async (req: Request, res: Response) => {
  const { firstName, lastName, email, username, password } = req.body;

  const user = User.build({ firstName, lastName, email, username, password });
  await user.save();
  return res.status(201).send(user);
});

export { router as userRouter };
