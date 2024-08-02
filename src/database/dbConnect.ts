import dotenv from "dotenv";
import mongoose from "mongoose";
/**
 *
 * @param MONGO_URI
 */
const mongooseConnect = async (MONGO_URI: string): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to database successfully...");
  } catch (error: any) {
    console.log(
      "failed to connect to the database. terminating the application...",
      error,
    );
    process.exit(1);
  }
};
export { mongooseConnect };
