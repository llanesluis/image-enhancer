"use server";

import User, { IUser } from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { revalidatePath } from "next/cache";
import { handleError } from "../utils";
import { CreateUserParams, UpdateUserParams } from "@/types/user";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (e) {
    handleError(e);
  }
}

export async function getUserById(clerkId: string) {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId });
    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user)) as IUser;
  } catch (e) {
    handleError(e);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate(
      { clerkId: clerkId },
      user,
      { new: true },
    );

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (e) {
    handleError(e);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ clerkId: clerkId });
    if (!userToDelete) throw new Error("User not found");

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);

    if (!deletedUser) return null;
    return JSON.parse(JSON.stringify(deletedUser));
  } catch (e) {
    handleError(e);
  } finally {
    revalidatePath("/");
  }
}

export async function updateCreditBalance(userId: string, creditFee: number) {
  try {
    await connectToDatabase();

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { credits: creditFee } },
      { new: true },
    );

    if (!updatedUserCredits) throw new Error("User credits update failed");

    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (e) {
    handleError(e);
  }
}
