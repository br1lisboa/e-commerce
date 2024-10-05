"use client";

import { placeOrder } from "@/actions";
import { cartStore, checkoutStore } from "@/store";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// TODO REVISAR FUNCION DE COLOCAR ORDEN
export function PlaceOrder() {
  const t = useTranslations("Checkout");
  const locale = useLocale();
  const navigate = useRouter();

  const { checkout } = checkoutStore();
  const { cart, cleanCart } = cartStore();

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState({
    show: false,
    message: "",
  });

  const totalArticles = cart.reduce((acc, c) => acc + c.quantity, 0);
  const subTotal = cart.reduce((acc, c) => acc + c.price * c.quantity, 0);
  const tax = (subTotal / 100) * 15;

  async function onPlaceOrder() {
    setIsPlacingOrder(true);
    const productsToOrder = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      size: item.size,
    }));
    const resp = await placeOrder(productsToOrder, checkout);
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setError({
        show: true,
        message: resp?.message ?? "Ocurrió un error",
      });
      return;
    }
    cleanCart();
    navigate.replace(`/${locale}/orders/${resp.order}`);
    setIsPlacingOrder(false);
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 flex flex-col justify-between space-y-5">
      <h2 className="text-2xl font-bold">{t("direction")}</h2>

      <div className="space-y-1">
        <p className="font-bold">
          Nombre: {checkout.name} {checkout.lastName}
        </p>
        <p>Dirección: {checkout.direction}</p>
        <p>Ciudad: {checkout.city}</p>
        <p>CP: {checkout.cp}</p>
        <p>País: {checkout.country}</p>
        <p>Tel: {checkout.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 bg-gray-200" />

      <div className="space-y-5">
        <h2 className="text-2xl font-bold">{t("summary")}</h2>

        <div className="grid grid-cols-2 space-y-1">
          <span>{t("quantity")}</span>
          <span className="text-right">
            {totalArticles} {t("article")}
          </span>

          <span>{t("subTotal")}</span>
          <span className="text-right">$ {subTotal}</span>

          <span>{t("tax")} (15%)</span>
          <span className="text-right">$ {tax}</span>

          <span className="text-3xl pt-5">{t("total")}:</span>
          <span className="text-right text-3xl pt-5">$ {subTotal + tax}</span>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="text-xs">{t("disclaimer")}</span>

        {error.show && (
          <p className="text-red-500 text-xs">
            {error.message} {""}
            <Link href={`/${locale}/cart`} className="underline">
              Ir al carrito
            </Link>
          </p>
        )}

        <button
          className={clsx({
            "flex btn-primary justify-center": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
          onClick={onPlaceOrder}
          //   href={`/${locale}/orders/123`}
        >
          {t("checkout")}
        </button>
      </div>
    </div>
  );
}
