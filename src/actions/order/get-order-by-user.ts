"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export async function getOrderByUser() {
  const session = await auth();
  console.log({ session });

  if (!session?.user) {
    return {
      ok: false,
      message: "No existe usuario activo",
    };
  }

  try {
    const ordersByUser = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      //   select: {
      //     id: true,
      //     isPaid: true,
      //   },
      include: {
        OrderAddress: {
          select: {
            name: true,
            lastName: true,
          },
        },
      },
    });

    if (!ordersByUser) throw "No hay ordenes";

    return {
      ok: true,
      ordersByUser,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No hay ordenes o ocurrió un error",
    };
  }
}
