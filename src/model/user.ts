import mongoose from "mongoose";
import { IUser, userModelInterface, userDoc } from "./InterfaceModel/IUser";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<userDoc, userModelInterface>("User", userSchema);

export { User };
