import mongoose from "mongoose";
import {
  ITransaction,
  ITrasnsactionModel,
  ITransactionDoc,
} from "./InterfaceModel/ITransaction";

const transactionSchema = new mongoose.Schema({
  account_type_id: {
    type: String,
    required: false,
  },
  transaction_type_id: {
    type: String,
    required: false,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: Number,
    required: false,
  },
});

transactionSchema.statics.build = (attr: ITransaction) => {
  return new Transaction(attr);
};
const Transaction = mongoose.model<ITransactionDoc, ITrasnsactionModel>(
  "Transaction",
  transactionSchema,
);
