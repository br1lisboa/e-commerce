"use server";

import prisma from "@/lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany();

    return {
      ok: true,
      categories,
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: "Hubo un error al obtener las categorías",
    };
  }
}
