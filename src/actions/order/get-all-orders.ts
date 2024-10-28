import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export async function getAllOrders() {
  const session = await auth();
  const isAdmin = session?.user.role === "admin";

  if (!session) {
    return {
      ok: false,
      message: "No hay usuario conectado",
    };
  }

  if (!isAdmin) {
    return {
      ok: false,
      message: "El usuario no es administrador",
    };
  }

  try {
    const allOrders = await prisma.order.findMany({
      include: {
        OrderAddress: {
          select: {
            name: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        isPaid: "asc",
      },
    });

    console.log({ allOrders });

    const ordersWithNames = allOrders.map((order) => ({
      id: order.id,
      isPaid: order.isPaid,
      OrderAddress: {
        name: order.OrderAddress?.name,
        lastName: order.OrderAddress?.lastName,
      },
    }));

    return {
      ok: true,
      ordersWithNames,
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: "Ocurrió un error al obtener las ordenes",
    };
  }
}
