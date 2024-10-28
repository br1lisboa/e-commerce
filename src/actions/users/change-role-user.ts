"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function changeUserRole(id: string, role: "admin" | "user") {
  const session = await auth();
  const isAdmin = session?.user.role === "admin";

  if (!isAdmin || !id || !role) {
    return {
      ok: false,
      message: "La cuenta no es admin, o no hay id o no hay rol",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        role: role,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
    };
  } catch (error) {
    console.log({ error });
    return {
      ok: false,
      message: "Ocurrió un error al realizar el cambio de rol en la base",
    };
  }
}
