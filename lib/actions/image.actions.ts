"use server";

import { connectToDatabase } from "./../database/mongoose";
import { AddImageParams, UpdateImageParams } from "@/types/image";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import Image, { IImage } from "../database/models/image.model";
import User, { IUser } from "../database/models/user.model";
import { notFound, redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";

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
    notFound();
  }
}

export async function getImages({ limit = 9, page = 1, searchQuery = "" }) {
  try {
    await connectToDatabase();
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    let expression = "folder=pickuro";

    if (searchQuery) expression += ` AND ${searchQuery}`;

    const { resources } = await cloudinary.search
      .expression(expression)
      .execute();

    const resourcesIds = resources.map((resource: any) => resource.public_id);

    let query = {};

    if (searchQuery) {
      query = {
        publicId: {
          $in: resourcesIds,
        },
      };
    }

    const skipAmount = (Number(page) - 1) * limit;

    const images = await Image.find(query)
      .populate({
        path: "author",
        model: User,
        select: "_id firstName lastName",
      })
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    if (!images) throw new Error("No se encontraron imagenes");

    const totalImages = await Image.countDocuments(query);
    const savedImages = await Image.countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
      savedImages,
    };
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

    const imageToUpdate = await Image.findById(image._id);

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
      throw new Error("Sin autorizacion, o imagen no encontrada");
    }

    const updatedImage = await Image.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true },
    );

    revalidatePath(path);

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
