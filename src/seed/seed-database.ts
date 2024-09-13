import { initialData } from "./seed";
import prisma from "../lib/prisma";

function capitalizeFirstLetter(string: String) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function main() {
  // borra registros previos
  await Promise.all([
    prisma.user.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  // insertar datos
  const { products, categories, users } = initialData;

  // insertar users
  await prisma.user.createMany({
    data: users,
  });

  // insertar categorías
  const categoriesData = categories.map((category) => ({
    name: capitalizeFirstLetter(category),
  }));
  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  // insertar productos
  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const productDB = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    const imagesData = images.map((image) => ({
      url: image,
      productId: productDB.id,
    }));
    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  //   console.log("categoriesMap", categoriesMap);
  console.log("Seed database OK!");
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
