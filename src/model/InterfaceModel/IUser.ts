import mongoose from "mongoose";

interface userDoc extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

interface userModelInterface extends mongoose.Model<userDoc> {
  build(attr: IUser): userDoc;
}

export { IUser, userModelInterface, userDoc };
