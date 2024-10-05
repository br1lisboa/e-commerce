import prisma from "@/lib/prisma";

export async function getAllCountries() {
  try {
    const countries = await prisma.countries.findMany({
      orderBy: { name: "asc" },
    });

    return countries.map((country) => ({
      value: country.id,
      label: country.name,
    }));
  } catch (error) {
    console.error(error);
  }
}
