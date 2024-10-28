"use server";

import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

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
  //   images: z.array(z.string()).optional(),
});

export async function createUpdateProduct(formData: FormData) {
  const data = Object.fromEntries(formData);
  console.log({ data });

  const productParsed = schema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return {
      ok: false,
      errors: String(productParsed.error),
    };
  }

  console.log("data valida -->", productParsed.data);

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

      // si todo sale bien revalidar path
      revalidatePath("/admin/products");
      revalidatePath(`/admin/products/${product.slug}`);
      revalidatePath(`/products/${product.slug}`);

      return {
        product,
      };
    });
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
