import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SummaryInformation = {
  subTotal: number;
  tax: number;
  total: number;
  itemsInCart: number;
};

type State = {
  cart: CartProduct[];

  // Actions
  getTotalItems: () => number;
  getSummaryInformation: () => SummaryInformation;

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (
    product: CartProduct,
    quantityUpdated: number
  ) => void;
  removeProductFromCart: (id: string, size: string) => void;
};

export const cartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Actions

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );

        const tax = subTotal * 0.15;

        const total = subTotal + tax;

        const itemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        // 1- Revisar si el producto ya está en el carrito con la talla seleccionada
        const productInCart = cart.some(
          (p) => p.id === product.id && p.size === product.size
        );

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }
        // 2- Se que el producto existe por talla. Incrementar
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantityChange: number) => {
        const { cart } = get();

        const updatedCartProducts = cart
          .map((item) => {
            if (item.id === product.id && item.size === product.size) {
              const updatedQuantity = Math.max(0, quantityChange);

              return {
                ...item,
                quantity: updatedQuantity,
              };
            }

            return item;
          })
          .filter((item) => item.quantity > 0);

        set({ cart: updatedCartProducts });
      },

      removeProductFromCart: (id: string, size: string) => {
        const { cart } = get();

        const updatedCartProducts = cart.filter(
          (item) => item.id !== id || item.size !== size
        );

        set({ cart: updatedCartProducts });
      },
    }),

    {
      name: "cart-store",
    }
  )
);
