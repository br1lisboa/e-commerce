import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const PRODUCTS_IN_CART = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function CartPage() {
  const locale = useLocale();

  const t = useTranslations("Cart");

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[1000px]">
        <Title title={t("title")} className="px-5 md:px-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pb-5">
          {/*  Cart*/}
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col px-5 md:px-0">
              <span className="text-xl">{t("addItems")}</span>

              <Link href={`/${locale}/`} className="underline">
                {t("addItemsBtn")}
              </Link>
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
                  <p>$ {product.price}</p>
                  <QuantitySelector quantity={3} />
                  <button className="underline">{t("remove")}</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 space-y-5">
            <h2 className="text-2xl">{t("summary")}</h2>

            <div className="grid grid-cols-2 space-y-1">
              <span>{t("quantity")}</span>
              <span className="text-right">3 {t("article")}</span>

              <span>{t("subTotal")}</span>
              <span className="text-right">$ 100</span>

              <span>{t("tax")} (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="text-2xl pt-5">{t("total")}:</span>
              <span className="text-right pt-5">$ 100</span>
            </div>

            <div>
              <Link
                className="flex btn-primary justify-center"
                href={`/${locale}/checkout/address`}
              >
                {t("checkout")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
