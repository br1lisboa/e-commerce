"use server";

import prisma from "@/lib/prisma";

export async function setTransactionIdInOrder(
  orderId: string,
  transactionId: string
) {
  try {
    if (!orderId || !transactionId) throw Error("Falta ID");

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    return {
      ok: true,
      message: "Operación exitosa",
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: "Ocurrió un error al guardar el id de transacción",
    };
  }
}
