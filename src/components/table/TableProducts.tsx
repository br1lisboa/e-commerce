"use client";
export const revalidate = 0;

import { changeUserRole } from "@/actions";
import { Title } from "../ui/title/Title";
import { Gender, Size } from "@prisma/client";
import Image from "next/image";
import { currencyFormat } from "@/utils";
import Link from "next/link";
import { useLocale } from "next-intl";
import { ProductImage } from "../product/product-image/ProductImage";

export function TableProducts({
  products = [],
  title,
}: {
  products:
    | {
        images: string[];
        ProductImage: {
          url: string;
        }[];
        id: string;
        title: string;
        description: string;
        inStock: number;
        price: number;
        sizes: Size[];
        slug: string;
        tags: string[];
        gender: Gender;
        categoryId: string;
      }[];
  title: string;
}) {
  const locale = useLocale();
  //   async function changeRole(id: string, role: "admin" | "user") {
  //     await changeUserRole(id, role);
  //   }

  return (
    <>
      <Title title={title} />

      <div className="flex justify-end my-5">
        <Link className="btn-primary" href={`/${locale}/admin/products/new`}>
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Genero
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Stock
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Tallas
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className=" text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link href={`/${locale}/product/${product.slug}`}>
                    <ProductImage
                      src={product.ProductImage[0]?.url}
                      width={80}
                      height={80}
                      alt={product.title}
                    />
                  </Link>
                </td>
                <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/${locale}/admin/products/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="text-sm font-bold text-gray-900  px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>
                <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.gender}
                </td>
                <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {product.inStock}
                </td>
                <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {product.sizes.join(" / ")}
                </td>

                {/* <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <select
                    className="text-sm text-gray-900 py-2 px-4 rounded-sm w-full"
                    value={user.role}
                    onChange={(e) =>
                      changeRole(user.id, e.target.value as "admin" | "user")
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
