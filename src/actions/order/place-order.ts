"use server";

import { auth } from "@/auth.config";

import type { TUserAddress } from "../address/user-address";
import type { ValidSize } from "@/interfaces";
import prisma from "@/lib/prisma";

type TProductToOrder = {
  productId: string;
  quantity: number;
  size: ValidSize;
};

export async function placeOrder(
  productsId: TProductToOrder[],
  address: TUserAddress
) {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "No hay session de usuario",
    };
  }

  if (productsId.length === 0) {
    return {
      ok: false,
      message: "No hay items en el carrito",
    };
  }

  // Obtener la info de los productos
  // Nota: recordar que se puede llevar dos productos con el mismo ID
  const products = await prisma.product.findMany({
    where: {
      id: { in: productsId.map((p) => p.productId) },
    },
  });

  // Calcular la cantidad de items // Encabezado
  const itemsInOrder = productsId.reduce((count, p) => count + p.quantity, 0);

  // Tomar los totales, tax, subtotal, total
  const { subTotal, tax, total } = productsId.reduce(
    (total, item) => {
      const productQuantity = item.quantity;
      const product = products.find((p) => p.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = productQuantity * product.price;

      total.subTotal += subTotal;
      total.tax += subTotal * 0.15;
      total.total += subTotal * 1.15;

      return total;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // paso 1 actualizar el stock de los productos
      const updatedProductsPromises = products.map((p) => {
        const productQuantity = productsId
          .filter((pr) => pr.productId === p.id)
          .reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${p.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: p.id },
          data: {
            inStock: {
              // no sirve para hacer un decremento con valores reales
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);
      // verificar valores negativos en la existencia, significa que no hay stock
      updatedProducts.forEach((updProd) => {
        if (updProd.inStock < 0) {
          throw new Error(`${updProd.title} no tiene stock`);
        }
      });

      // paso 2 crear la orden - encabezado - detalle
      const order = await tx.order.create({
        data: {
          userId: session?.user.id,
          productsInOrder: itemsInOrder,
          subTotal,
          tax,
          total,

          OrderItem: {
            createMany: {
              data: productsId.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });

      // paso 3 crear dir de la orden
      const orderAddress = await tx.orderAddress.create({
        data: {
          name: address.name,
          lastName: address.lastName,
          phone: address.phone,
          direction: address.direction,
          direction2: address.direction2,
          country: address.country,
          city: address.city,
          cp: address.cp,
          orderAddressId: order.id,
        },
      });

      return {
        order,
        orderAddress,
        updatedProducts,
      };
    });
    return {
      ok: true,
      order: prismaTx.order.id,
      prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
}
