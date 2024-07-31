import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { mongooseConnect } from "./database/dbConnect";
import { userRouter } from "./api/route/securityRoutes";
// import cors from "cors"
const cors = require('cors');

dotenv.config();
//Middle Wares
const app = express();
const { PORT = 4000, MONGO_URI = "" } = process.env;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// API ROUTES
app.use(userRouter);

//Connect DBßßß

mongooseConnect(MONGO_URI);
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
