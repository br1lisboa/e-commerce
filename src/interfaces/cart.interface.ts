import { ValidSize } from "./product.interface";

export type CartProduct = {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: ValidSize;
  image: string;
};
