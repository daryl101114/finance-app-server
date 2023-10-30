import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../../model/user";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";

interface SecurityResponse {
  message: string;
  error: any;
}

// interface ISecurityController extends SecurityController

class SecurityController {
  public static async createUser(req: Request): Promise<SecurityResponse> {
    //Handle Create User Here
    try {
      //Extract User data properties from request body
      let { firstName, lastName, email, username, password } = req.body;

      //Hash password
      const saltRounds = 10;
      password = await hash(password, saltRounds);

      //Stor user to DB
      const user = User.build({
        firstName,
        lastName,
        email,
        username,
        password,
      });
      await user.save();

      return { message: "User created successfuly", error: null };
    } catch (err) {
      console.error(err);
      return { message: "Failed to create user", error: err };
    }
  }
}

export { SecurityController };
