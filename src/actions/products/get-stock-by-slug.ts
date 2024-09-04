"use server";

import prisma from "@/lib/prisma";

export async function getStockBySlug(slug: string): Promise<number> {
  if (!slug) return 0;
  try {
    const stock = await prisma.product.findFirst({
      where: {
        slug,
      },
      select: {
        inStock: true,
      },
    });

    if (!stock) return 0;
    return stock.inStock ?? 0;
  } catch (error) {
    console.error(error);
    throw new Error("Error getting stock by slug");
  }
}
