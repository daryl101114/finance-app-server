import { Request, Response } from "express";
import { IExpense } from "../../model/InterfaceModel/IExpense";
import { Expense } from "../../model/expense";
interface IApiResponse {
  message: string;
  statusCode: number;
}

class ExpenseController {
  /** GET */
  public static async getAllExpense(): Promise<IExpense[]> {
    const expenses: IExpense[] = await Expense.find();
    return expenses;
  }

  /** POST */
  public static async CreateExpense(expense: IExpense): Promise<IApiResponse> {
    const {
      account_type_id,
      expense_name,
      expense_amount,
      expense_description,
      expense_type,
    } = expense;
    const expenseRecord = Expense.build({
      account_type_id,
      expense_name,
      expense_description,
      expense_amount,
      expense_type,
    });
    await expenseRecord.save();
    return { message: "User created successfuly", statusCode: 201 };
  }
}

export default ExpenseController;
