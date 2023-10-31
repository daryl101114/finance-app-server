import { Request, Response } from "express";
import { getErrorMessage } from "../../utils/util";
import * as userService from "../services/userService";

class SecurityController {
  public static async createUser(req: Request, res: Response) {
    //Handle Create User Here
    try {
      //Extract User data properties from request body
      await userService.register(req.body);
      res.status(201).send("User created successfuly");
    } catch (err) {
      console.error(err);
      return res.status(500).send(getErrorMessage(err));
    }
  }

  public static async login(req: Request, res: Response) {
    try {
      const foundUser = await userService.login(req.body);
      res.status(200).send(foundUser);
    } catch (error) {
      return res.status(500).send(getErrorMessage(error));
    }
  }
}

export { SecurityController };
