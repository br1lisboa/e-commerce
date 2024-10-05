import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrder } from "./ui/PlaceOrder";

export default function CheckoutPage() {
  const locale = useLocale();

  const t = useTranslations("Checkout");

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[1000px]">
        <Title title={t("title")} className="px-5 md:px-0" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pb-5">
          {/*  Cart*/}
          <div className="flex flex-col space-y-5">
            <div className="flex flex-col px-5 md:px-0">
              <span className="text-xl">{t("addItems")}</span>

              <Link href={`/${locale}/cart`} className="underline">
                {t("addItemsBtn")}
              </Link>
            </div>

            {/* Items */}
            <ProductsInCart />
          </div>

          {/* Checkout */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
