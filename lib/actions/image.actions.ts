"use server";

import { connectToDatabase } from "./../database/mongoose";
import { AddImageParams, UpdateImageParams } from "@/types/image";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import Image, { IImage } from "../database/models/image.model";
import User, { IUser } from "../database/models/user.model";
import { redirect } from "next/navigation";

export async function getImageById(imageId: string) {
  try {
    await connectToDatabase();

    const image = await Image.findById(imageId).populate({
      path: "author",
      model: User,
      select: "_id firstName lastName",
    });

    if (!image) throw new Error("Image not found");

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    handleError(error);
  }
}

export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    await connectToDatabase();

    const author: IUser | null = await User.findById(userId);
    if (!author?._id) throw new Error("User (author) not found");

    const newImage = await Image.create({ ...image, author: author._id });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
    handleError(error);
  }
}
export async function updateImage({ image, userId, path }: UpdateImageParams) {
  try {
    await connectToDatabase();

    const imageToUpdate: IImage | null = await Image.findById(image._id);

    if (!imageToUpdate || imageToUpdate.author._id !== userId)
      throw new Error("Unauthorized or image not found");

    const updatedImage = await Image.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true },
    );

    revalidatePath;

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    handleError(error);
  }
}
export async function deleteImage(imageId: string) {
  try {
    await connectToDatabase();

    await Image.findByIdAndDelete(imageId);
  } catch (error) {
    handleError(error);
  } finally {
    redirect("/");
  }
}
