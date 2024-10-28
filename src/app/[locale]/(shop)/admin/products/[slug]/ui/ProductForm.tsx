"use client";

import { createUpdateProduct } from "@/actions";
import {
  InputChipElement,
  InputSelectElement,
  InputTextAreaElement,
  InputTextElement,
} from "@/components";
import { InputImageElement } from "@/components/form/InputImageElement";
import { IProduct } from "@/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const ProductForm = ({ product, categ, isForCreate }: Props) => {
  const router = useRouter();
  const locale = useLocale();

  const { control, handleSubmit, formState } = useForm<Partial<IProduct>>({
    defaultValues: isForCreate
      ? undefined
      : {
          title: product?.title,
          price: String(product?.price),
          slug: product?.slug,
          description: product?.description,
          inStock: product?.inStock,
          tags: product?.tags,
          sizes: product?.sizes,
          gender: product?.gender,
          categoryId: product?.categoryId,
        },
    resolver: zodResolver(schema),
    mode: "all",
  });

  console.log(formState.errors);

  async function onSubmit(data: Partial<IProduct>) {
    const formData = new FormData();
    const { ...productToSave } = data;

    if (product?.id) {
      formData.append("id", product?.id ?? "");
    }

    formData.append("title", productToSave.title ?? "");
    formData.append("slug", productToSave.slug ?? "");
    formData.append("description", productToSave.description ?? "");
    formData.append("price", productToSave.price?.toString() ?? "");
    formData.append("inStock", productToSave.inStock?.toString() ?? "");
    formData.append("sizes", productToSave.sizes?.join(",") ?? "");

    formData.append(
      "tags",
      typeof productToSave.tags === "string"
        ? productToSave.tags ?? ""
        : productToSave.tags?.join(",") ?? ""
    );

    formData.append("categoryId", productToSave.categoryId ?? "");
    formData.append("gender", productToSave.gender ?? "");
    // formData.append("images", productToSave.images ?? []);

    const { ok, product: productTX } = await createUpdateProduct(formData);
    console.log({ ok });
    console.log(formData);

    if (!ok) {
      alert("Producto no se pudo actualizar");
      return;
    }

    router.replace(`/${locale}/admin/products/${productTX?.slug}`);
  }

  const categories = categ
    ? categ.categories.map((c) => ({
        label: c.name,
        value: c.id,
      }))
    : [];

  return (
    <form
      className="grid px-5 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full space-y-5">
        <InputTextElement control={control} name={"title"} label="Titulo" />

        <InputTextElement control={control} name={"slug"} label="Slug" />

        <InputTextAreaElement
          control={control}
          name={"description"}
          label="Descripción"
        />

        <InputTextElement control={control} name={"price"} label="Precio" />

        <InputTextElement control={control} name={"inStock"} label="Stock" />

        <InputTextElement control={control} name={"tags"} label="Tag" />

        <button className="btn-primary w-full" type="submit">
          Guardar
        </button>
      </div>

      <div className="w-full space-y-5">
        <div>
          <InputChipElement
            label="Tallas"
            control={control}
            name={"sizes"}
            selectedElements={product?.sizes ?? []}
            availableElements={["XS", "S", "M", "L", "XL", "XXL"]}
          />
        </div>

        <InputSelectElement
          control={control}
          name={"gender"}
          label="Genero"
          options={[
            {
              label: "Men",
              value: "men",
            },
            {
              label: "Women",
              value: "women",
            },

            {
              label: "Kid",
              value: "kid",
            },

            {
              label: "Unisex",
              value: "unisex",
            },
          ]}
        />

        <InputSelectElement
          control={control}
          name={"categoryId"}
          label="Categoría"
          options={categories ?? []}
        />

        {/* <div className="flex flex-col mb-2">
          <span>Fotos</span>
          <input
            type="file"
            multiple
            className="p-2 border rounded-md bg-gray-200"
            accept="image/png, image/jpeg, image/avif"
          />
        </div> */}

        <InputImageElement control={control} name={"images"} />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {product?.ProductImage.map((image) => (
            <div key={image.id} className="space-y-1 m-auto ">
              <Image
                src={`/products/${image.url}`}
                alt={String(image.id)}
                width={300}
                height={300}
                className="rounded shadow-md"
              />
              <button
                onClick={() => {
                  console.log(image.id, image.url);
                }}
                className="btn-danger w-full"
                type="button"
              >
                {" "}
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

interface Props {
  product: IProduct | null;
  categ: {
    ok: boolean;
    categories: {
      id: string;
      name: string;
    }[];
    message?: undefined;
  };
  isForCreate: boolean;
}

const schema = z.object({
  description: z.string().min(5),
  images: z.string().optional(),
  inStock: z.coerce.number(),
  price: z.string().refine((val) => !isNaN(Number(val))),
  sizes: z.array(z.string()),
  slug: z.string(),
  tags: z.union([z.string(), z.array(z.string())]),
  title: z.string(),
  gender: z.enum(["men", "women", "kid", "unisex"]),
  categoryId: z.string(),
});
