"use server";

import { IPaypalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function paypalCheckPayment(transactionId?: string) {
  if (!transactionId) {
    return {
      ok: false,
      message: "Falta ID de transacción de paypal",
    };
  }

  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo obtener el token de verificación",
    };
  }

  const verifyPaymentPaypal = await verifyPaypalPayment(
    transactionId,
    authToken
  );

  if (!verifyPaymentPaypal) {
    return {
      ok: false,
      message: "Error al verificar el pago",
    };
  }

  const { status, purchase_units } = verifyPaymentPaypal;
  const { invoice_id } = purchase_units[0];

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Aun no se ha pagado en Paypal",
    };
  }

  try {
    await prisma.order.update({
      where: {
        id: invoice_id,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    // TODO revalidar un path
    revalidatePath(`/orders/${invoice_id}`);
    return {
      ok: true,
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: "El pago no se pudo registrar en la base de datos",
    };
  }
}

async function getPaypalBearerToken(): Promise<string | null> {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const auth2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();

  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();

  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(auth2Url, {
      ...requestOptions,
      cache: "no-store",
    }).then((r) => r.json());
    return result.access_token;
  } catch (error) {
    console.log({ error });
    return null;
  }
}

async function verifyPaypalPayment(
  paypalTransactionId: string,
  bearerToken: string
): Promise<IPaypalOrderStatusResponse | null> {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(
      `https://api.sandbox.paypal.com/v2/checkout/orders/${paypalTransactionId}`,
      { ...requestOptions, cache: "no-store" }
    ).then((r) => r.json());
    return response;
  } catch (error) {
    console.log({ error });
    return null;
  }
}
