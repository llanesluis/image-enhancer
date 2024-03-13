import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema({
  amount: { type: Number, required: true },
  stripeId: { type: String, required: true, unique: true },
  plan: { type: String },
  credits: { type: String },
  createdAT: { type: Date, default: Date.now },
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
});

export interface ITransaction {
  _id: string;
  amount: number;
  stripeId: string;
  plan?: string;
  credits?: string;
  createdAT: Date;
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

const Transaction =
  models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
