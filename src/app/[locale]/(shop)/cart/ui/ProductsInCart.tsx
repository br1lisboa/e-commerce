"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import { cartStore } from "@/store";
import { ProductImage, QuantitySelector, Skeleton } from "@/components";
import Link from "next/link";

export function ProductsInCart() {
  const t = useTranslations("Cart");

  const locale = useLocale();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const { cart, updateProductQuantity, removeProductFromCart } = cartStore();

  return isLoading ? (
    <Skeleton />
  ) : (
    <>
      {cart.map((product) => (
        <div key={`${product.slug} - ${product.size}`} className="flex gap-2">
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            alt={product.title}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              width: 100,
              height: 100,
            }}
            className="rounded-md"
          />

          <div>
            <Link
              className="hover:underline cursor-pointer"
              href={`/${locale}/product/${product.slug}`}
            >
              <p>
                {product.title} - {product.size}
              </p>
            </Link>
            <p>$ {product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onClickQuantity={(value) => updateProductQuantity(product, value)}
            />
            <button
              className="underline"
              onClick={() => removeProductFromCart(product.id, product.size)}
            >
              {t("remove")}
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
