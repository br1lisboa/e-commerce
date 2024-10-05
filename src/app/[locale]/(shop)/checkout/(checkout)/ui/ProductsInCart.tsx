"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { cartStore } from "@/store";
import { Skeleton } from "@/components";
import { useValidateCart } from "@/hooks";

export function ProductsInCart() {
  const [isLoading, setIsLoading] = useState(true);

  // useValidateCart();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const { cart } = cartStore();

  return isLoading ? (
    <Skeleton />
  ) : (
    <>
      {cart.map((product) => (
        <div key={`${product.slug} - ${product.size}`} className="flex gap-2">
          <Image
            src={`/products/${product.image}`}
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
            <span className="hover:underline">
              <p>
                {product.title} - {product.size} - ({product.quantity})
              </p>
            </span>
            <p className="font-bold">$ {product.price * product.quantity}</p>
          </div>
        </div>
      ))}
    </>
  );
}
