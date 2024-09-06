"use client";

import { cartStore } from "@/store";
import clsx from "clsx";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

export function TotalItems() {
  const locale = useLocale();

  const { getTotalItems } = cartStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {!isLoading && (
        <Link
          className="relative m-2 rounded-md transition-all hover:bg-gray-100"
          href={`/${locale}/${getTotalItems() === 0 ? "empty" : "cart"}`}
        >
          <span
            className={clsx(
              "absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-500 text-white"
            )}
          >
            {getTotalItems() !== 0 && getTotalItems()}
          </span>
          <IoCartOutline className="w-5 h-5" />
        </Link>
      )}
    </>
  );
}
