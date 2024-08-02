import mongoose from "mongoose";

interface ITransactionTypeDoc extends mongoose.Document {
  transaction_name: string;
}

interface ITransactionType {
  transaction_name: string;
}

interface ItransactionTypeModel extends mongoose.Model<ITransactionTypeDoc> {
  build(attr: ITransactionType): ITransactionTypeDoc;
}

export { ITransactionType, ItransactionTypeModel, ITransactionTypeDoc };
