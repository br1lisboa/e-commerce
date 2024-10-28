"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export async function getAllUsers() {
  const session = await auth();
  const isAdmin = session?.user.role === "admin";

  if (!isAdmin) {
    return {
      ok: false,
      message: "El usuario no es administrador",
    };
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "desc",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    return {
      ok: true,
      users,
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: "Ocurrió un error al recuperar los usuarios",
    };
  }
}
