export const revalidate = 604800;

import type { Metadata, ResolvingMetadata } from "next";
import { useTranslations } from "next-intl";

import notFound from "../not-found";
import { getProductsBySlug } from "@/actions";

import {
  QuantitySelector,
  SizeSelector,
  SlideShow,
  SlideShowMobile,
  StockLabel,
} from "@/components";

import { titleFont } from "@/config/fonts";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  const product = await getProductsBySlug(slug);

  return {
    title: product?.title ?? "Product not found",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Product not found",
      description: product?.description ?? "",
      images: [`products/${product?.images[1]}`],
    },
  };
}

export default async function ({ params: { slug } }: Props) {
  const product = await getProductsBySlug(slug);

  if (!product) {
    notFound();
    return null;
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 space-x-2">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Desktop slideshow */}
        <SlideShow
          title={product.title}
          slides={product.images}
          classMame="hidden md:block"
        />

        {/* Mobile slideshow */}
        <SlideShowMobile
          title={product.title}
          slides={product.images}
          classMame="block md:hidden"
        />
      </div>

      {/* Details */}
      <div className="col-span-1 space-y-5">
        <div>
          <StockLabel slug={product.slug} />

          <h1
            className={`${titleFont.className} antialiased font-bold text-xl`}
          >
            {product.title}
          </h1>

          <p className="text-lg">$ {product.price}</p>
        </div>

        <AddToCart product={product} />

        {/* Description */}
        <div>
          <DescriptionProduct />
          <p className="font-light">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

function DescriptionProduct() {
  const t = useTranslations("Product");

  return <h3 className="font-bold text-sm">{t("description")}</h3>;
}
