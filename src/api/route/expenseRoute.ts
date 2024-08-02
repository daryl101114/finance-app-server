import ExpenseController from "../controllers/expenseController";
import express, { Request, Response, Router } from "express";
import { verifyToken } from "../utils/utils";

const router = express.Router();
const endpoint = "/api/expense";
/** GET */
router.get(
  endpoint + "/getAllExpenses",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const result = await ExpenseController.getAllExpense();
      return res.status(200).send(result);
    } catch (err: any) {
      return res.status(500).send("Failed to retrieve all expenses");
    }
  },
);

/** POST */
router.post(
  endpoint + "/addExpense",
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      console.log("REQ BODY", req.body);
      const { statusCode, message } = await ExpenseController.CreateExpense(
        req.body,
      );
      return res.status(statusCode).send(message);
    } catch (err) {
      console.log(err);
      return res.status(500).send("Failed to add expense");
    }
  },
);

export { router as expenseRouter };
