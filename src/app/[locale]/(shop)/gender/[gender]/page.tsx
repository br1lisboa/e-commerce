export const revalidate = 10;

import { useTranslations } from "next-intl";
import { notFound } from "next/navigation";

import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWhitImages } from "@/actions";
import { Gender } from "@prisma/client";

const ALLOWED_CATEGORIES = ["men", "women", "kid"];

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page: string;
  };
}

function TitlePage({ genderT }: { genderT: string }) {
  const t = useTranslations(`Categories.${genderT}`);

  return <Title title={t("title")} subtitle={t("subtitle")} />;
}

export default async function ({ params: { gender }, searchParams }: Props) {
  if (!ALLOWED_CATEGORIES.includes(gender)) notFound();

  const page = searchParams.page ? Number(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWhitImages({
    page,
    gender: gender as Gender,
  });

  return (
    <>
      <TitlePage genderT={gender} />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
