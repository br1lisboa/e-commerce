import { useTranslations } from "next-intl";

import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const PRODUCTS = initialData.products;

export default function ShopPage() {
  const t = useTranslations("Title");

  return (
    <>
      <Title title={t("title")} subtitle={t("subtitle")} className="px-5 md:px-0"/>

      <ProductGrid products={PRODUCTS} />
    </>
  );
}
