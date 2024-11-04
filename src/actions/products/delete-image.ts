"use server";

import prisma from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export async function deleteImage(id: number, url: string) {
  if (!id || !url) {
    return {
      ok: false,
      message: "Invalid data",
    };
  }

  try {
    await prisma.$transaction(async () => {
      await cloudinary.uploader.destroy(url);

      const productDeleted = await prisma.productImage.delete({
        where: {
          id,
        },
        select: {
          product: {
            select: {
              slug: true,
            },
          },
        },
      });
      revalidatePath(`/admin/products/${productDeleted.product.slug}`);
      revalidatePath(`/admin/products`);
      revalidatePath(`/product/${productDeleted.product.slug}`);
    });

    return {
      ok: true,
      message: "Image deleted",
    };
  } catch (error) {
    console.log({ error });

    return {
      ok: false,
      message: "Error deleting image",
    };
  }
}
