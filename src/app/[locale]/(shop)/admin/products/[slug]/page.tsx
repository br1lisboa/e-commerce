import { getCategories, getProductsBySlug } from "@/actions";
import { ProductForm } from "./ui/ProductForm";
import { Title } from "@/components";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ({ params: { slug } }: Props) {
  const [product, categories] = await Promise.all([
    getProductsBySlug(slug),
    getCategories(),
  ]);

  const isForCreate = slug === "new";

  const title = isForCreate
    ? "Nuevo producto"
    : `Edición de producto ${product?.title}`;

  const testDefaultValues = { ...product, price: String(product?.price) };

  return (
    <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left m-auto py-8">
      <Title title={title} />
      <ProductForm
        product={product}
        categ={categories as any}
        isForCreate={isForCreate}
        testDefaultValues={testDefaultValues}
      />
    </div>
  );
}
