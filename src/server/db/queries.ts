import { auth } from "@clerk/nextjs/server";
import "server-only";
import { db } from "~/server/db";

export const getMyImages = async () => {
  const user = auth();

  if (!user.userId) {
    throw new Error("User unauthenticated");
  }

  const images = await db.query.images.findMany({
    where: (model, { eq }) => eq(model.userId, user.userId),
    orderBy: (model, { desc }) => desc(model.id),
  });

  return images;
};

export const getImageById = async (imageId: string) => {
  const user = auth();

  if (!user.userId) {
    throw new Error("User unauthorized");
  }

  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, imageId),
  });

  if (!image) {
    throw new Error("Image not found");
  }

  if (image.userId !== user.userId) {
    throw new Error("User unauthorized");
  }

  return image;
};
