"use client";

import { cartStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useValidateCart() {
  const navigation = useRouter();

  const { cart } = cartStore();

  useEffect(() => {
    if (cart.length === 0) {
      navigation.replace("/");
    }
  }, [cart, navigation]);
}
