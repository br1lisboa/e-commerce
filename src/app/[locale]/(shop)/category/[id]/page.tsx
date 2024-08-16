import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const ALLOWED_CATEGORIES = ["men", "women", "kid"];

const PRODUCTS = initialData.products;

interface Props {
  params: {
    id: string;
  };
}

export default function ({ params: { id } }: Props) {
  if (!ALLOWED_CATEGORIES.includes(id)) notFound();

  const t = useTranslations(`Categories.${id}`);

  const filteredProducts = PRODUCTS.filter((product)=>product.gender === id);

  return (
    <>
      <Title title={t("title")} subtitle={t("subtitle")} />

      <ProductGrid products={filteredProducts} />
    </>
  );
}
