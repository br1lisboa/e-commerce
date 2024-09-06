"use client";

import { Skeleton } from "@/components";
import { cartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function OrderSummary() {
  const t = useTranslations("Cart");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const { getSummaryInformation } = cartStore();
  const { subTotal, total, tax, itemsInCart } = getSummaryInformation();

  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="grid grid-cols-2 space-y-1">
          <span>{t("quantity")}</span>
          <span className="text-right">
            {itemsInCart} {t("article")}
          </span>

          <span>{t("subTotal")}</span>
          <span className="text-right"> {currencyFormat(subTotal)}</span>

          <span>{t("tax")} (15%)</span>
          <span className="text-right"> {currencyFormat(tax)}</span>

          <span className="text-2xl pt-5">{t("total")}:</span>
          <span className="text-right pt-5"> {currencyFormat(total)}</span>
        </div>
      )}
    </>
  );
}
