import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { mongooseConnect } from "./database/dbConnect";
import { userRouter } from "./api/route/securityRoutes";

dotenv.config();
//Middle Wares
const app = express();
const { PORT = 4000, MONGO_URI = "" } = process.env;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//SET HEADER
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// API ROUTES
app.use(userRouter);

//Connect DB

mongooseConnect(MONGO_URI);
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
