"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useStockLabel } from "./useStockLabel";

type Props = {
  slug: string;
};

export function StockLabel({ slug }: Props) {
  const { isLoading, stock } = useStockLabel({ slug });

  return (
    <h1
      className={clsx(
        `${titleFont.className} antialiased font-bold text-lg`,
        isLoading ? "animate-pulse bg-slate-200 w-[100px]" : ""
      )}
    >
      Stock: {isLoading ? "" : stock}
    </h1>
  );
}
