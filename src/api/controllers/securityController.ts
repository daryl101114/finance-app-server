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
console.log(req.body)
      const user = User.build({
        firstName,
        lastName,
        email,
        username,
        password,
      });
      try{
        await user.save();
      }
      catch(err:any){
        console.log("Failed to register user", err)
        throw new Error(err)
      }
      
      return { message: "User created successfuly" };
    } catch (err) {
      console.error(err);
      return { message: "Failed to create user" };
    }
  }
}

export { SecurityController };
