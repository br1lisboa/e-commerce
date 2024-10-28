import { getPaginatedProductsWhitImages } from "@/actions";
import { Pagination, TableProducts } from "@/components";

type Props = {
  searchParams: {
    page?: string;
  };
};

export default async function ({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWhitImages({
    page,
  });

  return (
    <>
      <TableProducts title="Mantenimiento de productos" products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
