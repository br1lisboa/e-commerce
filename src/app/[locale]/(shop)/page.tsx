import { useTranslations } from "next-intl";

import { ProductGrid, Title } from "@/components";
import { initialData } from "@/seed/seed";

const PRODUCTS = initialData.products;

export default function ShopPage() {
  const t = useTranslations("Title");

  return (
    <>
      <Title title={t("title")} subtitle={t("subtitle")} />

      <ProductGrid products={PRODUCTS} />
    </>
  );
}
