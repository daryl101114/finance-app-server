import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../../model/user";

interface SecurityResponse {
  message: string;
}

// interface ISecurityController extends SecurityController

class SecurityController {
  public static async createUser(req: Request): Promise<SecurityResponse> {
    //Handle Create User Here
    try {
      const { firstName, lastName, email, username, password } = req.body;

      const user = User.build({
        firstName,
        lastName,
        email,
        username,
        password,
      });
      await user.save();
      return { message: "User created successfuly" };
    } catch (err) {
      console.error(err);
      return { message: "Failed to create user" };
    }
  }
}

export { SecurityController };
