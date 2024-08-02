import mongoose from "mongoose";

interface ITransactionDoc extends mongoose.Document {
  account_type_id: string;
  transaction_type_id: string;
  amount: Number;
  description: string;
}

interface ITransaction {
  account_type_id: string;
  transaction_type_id: string;
  amount: Number;
  description: string;
}

interface ITrasnsactionModel extends mongoose.Model<ITransactionDoc> {
  build(attr: ITransaction): ITransactionDoc;
}
export { ITransaction, ITrasnsactionModel, ITransactionDoc };
