import mongoose from "mongoose";
import {
  IExpense,
  IExpenseDoc,
  IExpenseModel,
} from "./InterfaceModel/IExpense";

const expenseSchema = new mongoose.Schema({
  account_type_id: {
    type: String,
    required: true,
  },
  expense_name: {
    type: String,
    required: true,
  },
  expense_description: {
    type: String,
    required: false,
  },
  expense_amount: {
    type: String,
    required: true,
  },
  expense_type: {
    type: String,
    required: false,
  },
});

expenseSchema.statics.build = (attr: IExpense) => {
  return new Expense(attr);
};
const Expense = mongoose.model<IExpenseDoc, IExpenseModel>(
  "Expense",
  expenseSchema,
);

export { Expense };
