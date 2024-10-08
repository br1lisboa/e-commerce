import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Title } from "@/components";
import { OrderSummary, ProductsInCart } from "./ui";

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
            <ProductsInCart />
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 flex flex-col justify-between">
            <div className="space-y-5">
              <h2 className="text-2xl">{t("summary")}</h2>

              <OrderSummary />
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
