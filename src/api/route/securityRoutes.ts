import express, { Request, Response } from "express";
import { SecurityController } from "../controllers/securityController";
import { verifyToken } from "../utils/utils";
const router = express.Router();


//GET
router.get("/api/users", verifyToken, async (req: Request, res: Response) => {
  try{
    const result = await SecurityController.getAllUsers();
    return res.status(200).send(result)
  }catch(err){
    return res.status(500).send("Failed to retrieve users");
  }
});

router.post("/api/registerUser", async (req: Request, res: Response) => {
  try {
    const { statusCode, message } = await SecurityController.createUser(req);
    return res.status(statusCode).send(message);
  } catch (err) {
    return res.status(500).send("Failed to register user");
  }
});

router.post("/api/loginUser", async (req: Request, res: Response) => {
  try{

    const result = await SecurityController.loginUser(req);
    console.log(result)
    if(!result.token) throw new Error(result.message)
    return res.status(200).send(result)
  }catch(err){
    return res.status(500).send("Failed to authenticate user");
  }
});

export { router as userRouter };
