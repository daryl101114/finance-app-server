import { Document, ObtainDocumentType, SchemaDefinition } from "mongoose";
import { UserModel, I_UserDocument } from "../../model/user";
import { compareSync } from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY = "" } = process.env;

const secretKey: Secret = SECRET_KEY;

const register = async (user: I_UserDocument): Promise<void> => {
  try {
    //Stor user to DB
    await UserModel.create(user);
  } catch (error) {
    throw error;
  }
};

const login = async (user: I_UserDocument) => {
  try {
    console.log("user", user);
    //Find user in the DB
    const foundUser = await UserModel.findOne({
      email: user.email,
    });

    if (!foundUser) {
      throw new Error("Name of user is not correct");
    }
    //Check if password match
    const isMatch = compareSync(user.password, foundUser.password);
    if (isMatch) {
      const token = jwt.sign(
        { _id: foundUser._id?.toString(), name: foundUser.firstName },
        secretKey,
        {
          expiresIn: "2 days",
        }
      );
      return {
        user: { id: foundUser._id, name: foundUser.firstName },
        token: token,
      };
    } else {
      throw new Error("Password is not correct");
    }
  } catch (err) {
    throw err;
  }
};

export { register, login };
