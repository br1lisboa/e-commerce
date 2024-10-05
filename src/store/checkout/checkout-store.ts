import { create } from "zustand";
import { persist } from "zustand/middleware";

type TCheckout = {
  name: string;
  lastName: string;
  direction: string;
  direction2?: string | null;
  cp: string;
  city: string;
  country: string;
  phone: string;
};

type State = {
  checkout: TCheckout;
  setCheckout: (checkout: TCheckout) => void;
};

export const checkoutStore = create<State>()(
  persist(
    (set, get) => ({
      checkout: {} as TCheckout,
      setCheckout: (information: TCheckout) => {
        if (!information) return;
        set({ checkout: information });
      },
    }),

    {
      name: "checkout-store",
    }
  )
);
