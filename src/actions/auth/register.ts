"use server";

import prisma from "@/lib/prisma";

import bcryptjs from "bcryptjs";

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const userExist = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userExist) {
    console.error("Usuario ya registrado con ese correo");
    return {
      ok: false,
      message: "Ya se encuentra un usuario con ese correo",
    };
  }

  const passwordCrypt = bcryptjs.hashSync(password);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordCrypt,
      },
      select: {
        id: true,
      },
    });
    return {
      ok: true,
      user: user,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "No se pudo crear el usuario",
    };
  }
}
