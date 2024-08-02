import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { mongooseConnect } from "./database/dbConnect";
import routes from "./api/route";
// import cors from "cors"
const cors = require("cors");
dotenv.config();

//Middle Wares
const app = express();
const { PORT = 4000, MONGO_URI = "" } = process.env;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API ROUTES
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});
app.use(routes.userRouter);
app.use(routes.expenseRouter);

//Connect DB
mongooseConnect(MONGO_URI);

//Listen to server
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
