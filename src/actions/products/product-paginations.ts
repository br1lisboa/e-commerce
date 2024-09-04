"use server";
import { Gender } from "@prisma/client";
import prisma from "../../lib/prisma";

type TPaginatedOptions = {
  page?: number;
  take?: number;
  gender?: Gender;
};

export async function getPaginatedProductsWhitImages({
  page = 1,
  take = 12,
  gender,
}: TPaginatedOptions) {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (isNaN(Number(take))) take = 12;
  if (take < 12) take = 12;

  console.log("gender", gender);

  try {
    // Obtengo el total de productos
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      where: {
        gender: gender,
      },
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    // Obtengo el total de paginas.
    const totalCount = await prisma.product.count({
      where: {
        gender: gender,
      },
    });
    const totalPages = Math.ceil(totalCount / take);

    // en esta acción, en el return, podemos aplanar el tipo del producto
    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("Error getting products");
  }
}
