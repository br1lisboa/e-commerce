"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export type TUserAddress = {
  name: string;
  lastName: string;
  direction: string;
  direction2?: string | null;
  cp: string;
  city: string;
  country: string;
  phone: string;
};

export async function saveUserAddress(data: TUserAddress, userId: string) {
  try {
    const newAddress = await createOrReplaceAddress(data, userId);
    return {
      status: "success",
      message: "Dirección agregada exitosamente",
      newAddress,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "No se pudo grabar la dirección",
    };
  }
}

export async function deleteUserAddress(userId: string) {
  try {
    await prisma.userAddress.delete({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "No se pudo eliminar la dirección",
    };
  }
}

export async function getAddress() {
  const session = await auth();

  const userId = session?.user?.id;

  try {
    const address = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    return {
      name: address?.name,
      lastName: address?.lastName,
      direction: address?.direction,
      direction2: address?.direction2,
      cp: address?.cp,
      city: undefined,
      country: address?.countriesId,
      phone: address?.phone,
      rememberDir: undefined,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "No se puedo cargar la dirección",
    };
  }
}

async function createOrReplaceAddress(data: TUserAddress, userId: string) {
  try {
    const storeAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    const DBaddress = {
      userId,
      name: data.name,
      lastName: data.lastName,
      countriesId: data.country,
      cp: data.cp,
      city: data.city,
      direction: data.direction,
      direction2: data.direction2,
      phone: data.phone,
    };

    if (!storeAddress) {
      return await prisma.userAddress.create({
        data: DBaddress,
      });
    }

    return await prisma.userAddress.update({
      where: { userId },
      data: DBaddress,
    });
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "No se pudo grabar la dirección",
    };
  }
}
