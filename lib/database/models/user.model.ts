import { Schema, model, models, Document } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  photo: { type: String, required: true },
  planId: { type: Number, default: 1 },
  creditBalance: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export interface IUser {
  _id: string;
  clerkId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  photo: string;
  planId?: number;
  creditBalance?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const User = models.User || model("User", UserSchema);

export default User;
