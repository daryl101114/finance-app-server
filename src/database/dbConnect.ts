import dotenv from "dotenv";
const mongoose = require("mongoose");

const mongooseConnect = (MONGO_URI: string): void => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("connected to database successfully...");
    })
    .catch((error: Object) => {
      console.log(
        "failed to connect to the database. terminating the application..."
      );
      console.error(error);
      process.exit(1);
    });
};
export { mongooseConnect };
