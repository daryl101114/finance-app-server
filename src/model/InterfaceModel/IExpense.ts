import mongoose from "mongoose";

interface IExpenseDoc extends mongoose.Document {
  account_type_id: string;
  expense_name: string;
  expense_description: string;
  expense_amount: string;
  expense_type: string;
}

interface IExpense {
  account_type_id: string;
  expense_name: string;
  expense_description: string;
  expense_amount: string;
  expense_type: string;
}

interface IExpenseModel extends mongoose.Model<IExpenseDoc> {
  build(attr: IExpense): IExpenseDoc;
}

export { IExpense, IExpenseModel, IExpenseDoc };
