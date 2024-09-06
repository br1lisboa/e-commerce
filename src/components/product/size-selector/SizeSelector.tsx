"use client";

import { useTranslations } from "next-intl";
import clsx from "clsx";

import type { ValidSize } from "@/interfaces";

interface ISizeSelector {
  selectedSize: ValidSize | undefined;
  availableSizes: ValidSize[];
  onClickSize: (size: ValidSize) => void;
}

export function SizeSelector({
  selectedSize,
  availableSizes,
  onClickSize,
}: ISizeSelector) {
  const t = useTranslations("Product.selectSize");

  return (
    <div>
      <h3 className="font-bold">{t("title")}</h3>

      <div className="flex gap-2">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onClickSize(size)}
            className={clsx("hover:underline text-lg", {
              "font-bold underline": size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
