import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface I_UserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

const UserSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
});

//Hashing Password
const saltRounds = 8;
UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
  next();
});

const UserModel = mongoose.model<I_UserDocument>("User", UserSchema);
export { UserModel, I_UserDocument };
