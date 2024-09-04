import prisma from "@/lib/prisma";

export async function getProductsBySlug(slug: string) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
      include: {
        ProductImage: {
          select: {
            url: true,
          },
        },
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Error getting product by slug");
  }
}
