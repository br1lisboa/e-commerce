import { useTranslations } from "next-intl";

import notFound from "../not-found";
import { QuantitySelector, SizeSelector, SlideShow, SlideShowMobile } from "@/components";
import { titleFont } from "@/config/fonts";

import { initialData } from "@/seed/seed";

const PRODUCTS = initialData.products;

interface Props {
  params: {
    slug: string;
  };
}

export default function ({ params: { slug } }: Props) {
  const t = useTranslations("Product");

  const product = PRODUCTS.find((product) => product.slug === slug);

  if (!product) {
    notFound();
    return null;
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3 space-x-2">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        {/* Desktop slideshow */}
        <SlideShow title={product.title} slides={product.images} classMame="hidden md:block"/>

        {/* Mobile slideshow */}
        <SlideShowMobile title={product.title} slides={product.images} classMame="block md:hidden"/>
      </div>

      {/* Details */}
      <div className="col-span-1 space-y-5">
        <div>
          <h1
            className={`${titleFont.className} antialiased font-bold text-xl`}
          >
            {product.title}
          </h1>
          <p className="text-lg">$ {product.price}</p>
        </div>

        {/* Select tall */}
        <SizeSelector
          selectedSize={product.sizes[0]}
          availableSizes={product.sizes}
        />

        {/* Select quantity */}
        <QuantitySelector quantity={2} />

        {/* Button */}
        <button className="btn-primary">{t("button")}</button>

        {/* Description */}
        <div>
          <h3 className="font-bold text-sm">{t("description")}</h3>
          <p className="font-light">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
