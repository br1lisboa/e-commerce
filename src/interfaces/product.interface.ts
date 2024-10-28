export interface IProduct {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number | string;
  sizes: ValidSize[];
  slug: string;
  tags: string[];
  title: string;
  // type: ValidType;
  gender: "men" | "women" | "kid" | "unisex";
  ProductImage: {
    id: number;
    url: string;
  }[];
  categoryId?: string;
}

export type ValidSize = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type ValidType = "shirts" | "pants" | "hoodies" | "hats";
