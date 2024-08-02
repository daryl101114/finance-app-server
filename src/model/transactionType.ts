import mongoose from "mongoose";
import {
  ITransactionType,
  ItransactionTypeModel,
  ITransactionTypeDoc,
} from "./InterfaceModel/ITransactionType";

const transactionTypeSchema = new mongoose.Schema({
  transaction_name: {
    type: String,
    reqquired: true,
  },
});

transactionTypeSchema.statics.build = (attr: ITransactionType) => {
  return new TransactionType(attr);
};
const TransactionType = mongoose.model<
  ITransactionTypeDoc,
  ItransactionTypeModel
>("TransactioType", transactionTypeSchema);

export { TransactionType };
