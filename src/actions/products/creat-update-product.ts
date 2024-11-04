"use server";

import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const schemaNumber = z.coerce
  .number()
  .min(0)
  .transform((val) => Number(val.toFixed(2)));

const schema = z.object({
  id: z.string().uuid().nullable().optional(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: schemaNumber,
  inStock: schemaNumber,
  categoryId: z.string().uuid(),
  sizes: z.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
  images: z.array(z.string()).optional(),
});

export async function createUpdateProduct(formData: FormData) {
  const data = Object.fromEntries(formData);

  const productParsed = schema.safeParse(data);

  if (!productParsed.success) {
    return {
      ok: false,
      errors: String(productParsed.error),
    };
  }

  const product = productParsed.data;
  product.slug = product.slug.toLowerCase().replace(/ /g, "-").trim();
  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        product = await prisma.product.update({
          where: {
            id,
          },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      } else {
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
          },
        });
      }

      // Proceso de carga y guardado de imágenes
      // Recorrer las imágenes y guardarlas en el servidor

      if (Object.keys(data).some((k) => k.startsWith("images"))) {
        const allImages = Object.entries(data).filter(([key]) =>
          key.startsWith("images")
        );
        const images = await uploadImages(allImages);
        if (!images) {
          throw new Error("No se pudieron subir las imágenes");
        }
        await prisma.productImage.createMany({
          data: images.map((url) => ({
            url,
            productId: product.id,
          })),
        });
      }

      return {
        product,
      };
    });

    // si todo sale bien revalidar path
    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (error) {
    console.error({ error });
    return {
      ok: false,
      message: "No se pudo crear/actualizar el producto",
    };
  }
}

async function uploadImages(files: any) {
  //@ts-ignore
  const transformedArray = files.map(([, file]) => file);

  try {
    const uploadPromises = transformedArray.map(async (image: File) => {
      const buffer = await image.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");

      return cloudinary.uploader
        .upload(`data:image/png;base64,${base64}`)
        .then((r) => r.secure_url);
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.error({ error });
    return null;
  }
}
