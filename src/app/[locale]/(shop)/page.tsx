export const revalidate = 60;

import { useTranslations } from "next-intl";

import { getPaginatedProductsWhitImages } from "@/actions";

import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

function TitlePage() {
  const t = useTranslations("Title");

  return <Title title={t("title")} subtitle={t("subtitle")} />;
}

type Props = {
  searchParams: {
    page?: string;
  };
};

export default async function ShopPage({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWhitImages({
    page,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <TitlePage />

      <ProductGrid products={products as any} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
