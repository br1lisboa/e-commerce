"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export async function getOrderItems(orderId: string) {
  const session = await auth();

  // 1 validaciones
  if (!session?.user) {
    return {
      ok: false,
      message: "No hay session de usuario",
    };
  }

  if (!orderId) {
    return {
      ok: false,
      message: "No se proporciono un ID de orden",
    };
  }

  /* if (session.user.role !== "admin") {
    return {
      ok: false,
      message: "el usuario no es administrador",
    };
  } */

  // 2 búsquedas
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    const orderItems = await prisma.orderItem.findMany({
      where: {
        orderId: order?.id,
      },
    });

    const products = await Promise.all(
      orderItems.map(async (item) => {
        return await prisma.product.findUnique({
          where: {
            id: item.productId,
          },
          include: {
            ProductImage: true,
          },
        });
      })
    );

    const orderItemsWhitImages = orderItems.map((item) => {
      const product = products.find(
        (product) => product?.id === item.productId
      );

      if (!product) {
        return;
      }

      const { title, slug, ProductImage } = product;

      return { ...item, title, slug, images: ProductImage[0].url };
    });

    const orderAddress = await prisma.orderAddress.findUnique({
      where: {
        orderAddressId: order?.id,
      },
    });

    return {
      ok: true,
      order,
      orderItems: orderItemsWhitImages,
      orderAddress,
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se encontró la orden",
    };
  }
}
