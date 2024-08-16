import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

const PRODUCTS_IN_CART = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function ({ params: { id } }: Props) {
  const t = useTranslations("Order");

  //TODO> verificar admin role o redirect

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[1000px]">
        <Title title={`${t("title")} #${id}`} className="px-5 md:px-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pb-5">
          {/*  Cart*/}
          <div className="flex flex-col space-y-5">
            <div
              className={clsx(
                "flex gap-4 items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span>{t("orderNoPay")}</span> */}
              <span>{t("orderPay")}</span>
            </div>

            {/* Items */}
            {PRODUCTS_IN_CART.map((product) => (
              <div key={product.slug} className="flex gap-2">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    width: 100,
                    height: 100,
                  }}
                />

                <div>
                  <p>{product.title}</p>
                  <p>$ {product.price} x3</p>
                  <p className="font-bold">
                    {t("subTotal")}: {product.price * 3}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 flex flex-col justify-between space-y-5">
            <h2 className="text-2xl font-bold">{t("direction")}</h2>

            <div className="space-y-1">
              <p className="font-bold">Lisboa Bruno</p>
              <p>Av. de la Luz 123</p>
              <p>Col. Centro, CDMX</p>
              <p>CP 12345</p>
              <p>México</p>
              <p>55 1234 5678</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 bg-gray-200" />

            <div className="space-y-5">
              <h2 className="text-2xl font-bold">{t("summary")}</h2>

              <div className="grid grid-cols-2 space-y-1">
                <span>{t("quantity")}</span>
                <span className="text-right">3 {t("article")}</span>

                <span>{t("subTotal")}</span>
                <span className="text-right">$ 100</span>

                <span>{t("tax")} (15%)</span>
                <span className="text-right">$ 100</span>

                <span className="text-3xl pt-5">{t("total")}:</span>
                <span className="text-right text-3xl pt-5">$ 100</span>
              </div>
            </div>

            <div className="space-y-2">
              <div
                className={clsx(
                  "flex gap-4 items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white",
                  {
                    "bg-red-500": false,
                    "bg-green-700": true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                {/* <span>{t("orderNoPay")}</span> */}
                <span>{t("orderPay")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
