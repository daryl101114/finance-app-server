import { Request, Response } from "express";
import mongoose from "mongoose";
import { User } from "../../model/user";
import { encryptText, compareText } from "../utils/utils";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "../../model/InterfaceModel/IUser";
dotenv.config();

const { SECRET_KEY = "" } = process.env;
interface SecurityResponse {
  message: string;
  statusCode: number;
}
interface ILoginResponse {
  message: string;
  token?: string;
}

// interface ISecurityController extends SecurityController

class SecurityController {
  public static async getAllUsers(): Promise<IUser[]> {
    // const { id} = req.body;

    const user: IUser[] = await User.find();

    // Check if user is found
    console.log(user);
    return user;
  }

  public static async createUser(req: Request): Promise<SecurityResponse> {
    //Handle Create User Here
    try {
      const { firstName, lastName, email, username, password } = req.body;

      const hashedPassword = await encryptText(password);
      console.log(hashedPassword);
      if (!hashedPassword) throw new Error("Failed to hash password");
      const user = User.build({
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
      });
      await user.save();
      return { message: "User created successfuly", statusCode: 201 };
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create user");
    }
  }

  public static async loginUser(req: Request): Promise<ILoginResponse> {
    const { username, password } = req.body;
    console.log("hit");
    const user = await User.findOne({ username });
    // Check if user is found
    if (!user) return { message: "Username not found", token: undefined };

    //Check if username and password equal to each other
    const isPasswordValid = await compareText(password, user.password);
    if (!isPasswordValid)
      return { message: "Password does not match", token: undefined };

    //Sign Token
    const token = sign({ _id: user._id, name: username }, SECRET_KEY, {
      expiresIn: "2 days",
    });
    return { message: "User Authenticated!", token: token };
  }
}

export { SecurityController };
