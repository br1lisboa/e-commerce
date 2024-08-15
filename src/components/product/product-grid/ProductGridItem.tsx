"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";

import { IProduct } from "@/interfaces";
import { useState } from "react";

interface IProductGridItem {
  product: IProduct;
}

export default function ProductGridItem({ product }: IProductGridItem) {
  const locale = useLocale();
  const [imageIndex, setImageIndex] = useState(0);

  const HREF = `/${locale}/product/${product.slug}`;
  const SRC = `/products/${product.images[imageIndex]}`;

  const handleMouseEnter = () => setImageIndex(1);
  const handleMouseLeave = () => setImageIndex(0);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={HREF}>
        <Image
          src={SRC}
          alt={product.title}
          className="w-full object-cover rounded-sm "
          width={500}
          height={500}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-900" href={HREF}>
          {product.title}
        </Link>

        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
}
