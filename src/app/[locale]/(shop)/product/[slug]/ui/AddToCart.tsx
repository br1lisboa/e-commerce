"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import clsx from "clsx";

import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, IProduct, ValidSize } from "@/interfaces";
import { cartStore } from "@/store";

type Props = {
  product: IProduct;
};

type Selection = {
  size: ValidSize | undefined;
  quantity: number;
  clicked: boolean;
};

export function AddToCart({ product }: Props) {
  const t = useTranslations("Product");

  const { addProductToCart } = cartStore();

  const [selection, setSelection] = useState<Selection>({
    size: undefined,
    quantity: 1,
    clicked: false,
  });

  function handleSizeChange(newSize: ValidSize) {
    setSelection((prev) => ({ ...prev, size: newSize }));
  }

  function handleQuantityChange(newQuantity: number) {
    setSelection((prev) => ({ ...prev, quantity: newQuantity }));
  }

  function handleAddToCart() {
    setSelection((prev) => ({ ...prev, clicked: true }));
    if (!selection["size"]) return;

    const cartProduct: CartProduct = {
      id: product["id"],
      slug: product["slug"],
      title: product["title"],
      price: product["price"] as number,
      quantity: selection["quantity"],
      size: selection["size"],
      image: product["images"][0],
    };

    addProductToCart(cartProduct);

    setSelection({ size: undefined, quantity: 1, clicked: false });
  }

  return (
    <>
      {selection["clicked"] && !selection["size"] && (
        <div className="text-red-500 fade-in">{t("errorMessage")}</div>
      )}

      <SizeSelector
        availableSizes={product["sizes"]}
        selectedSize={selection["size"]}
        onClickSize={handleSizeChange}
      />
      <QuantitySelector
        maxQuantity={product["inStock"]}
        quantity={selection["quantity"]}
        onClickQuantity={handleQuantityChange}
      />
      <button onClick={handleAddToCart} className={clsx("btn-primary")}>
        {t("button")}
      </button>
    </>
  );
}
