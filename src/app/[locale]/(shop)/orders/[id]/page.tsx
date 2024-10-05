import Image from "next/image";
import { useTranslations } from "next-intl";

import { PayPalButton, Title } from "@/components";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { getOrderItems } from "@/actions";
import { Size } from "@prisma/client";
import { currencyFormat } from "@/utils";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function ({ params: { id } }: Props) {
  const { order, orderItems, orderAddress, message, ok } = await getOrderItems(
    id
  );
  console.log({ message });

  if (!ok) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-[1000px]">
        <TitlePage id={id} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pb-5">
          {/*  Cart*/}
          <div className="flex flex-col space-y-5">
            <InfoBanner isPayed={order?.isPaid} />

            {/* Items */}
            <InfoProduct products={orderItems as any} />
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 flex flex-col justify-between space-y-5">
            <InfoOrder
              productsInCart={order?.productsInOrder}
              subTotal={order?.subTotal}
              tax={order?.tax}
              total={order?.total}
              name={orderAddress?.name}
              lastName={orderAddress?.lastName}
              direction={orderAddress?.direction}
              city={orderAddress?.city}
              country={orderAddress?.country}
              cp={orderAddress?.cp}
              phone={orderAddress?.phone}
            />

            {!order?.isPaid && (
              <div className="space-y-2">
                <PayPalButton id={order!.id} amount={order!.total} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TitlePage({ id }: { id: string }) {
  const t = useTranslations("Order");
  return <Title title={`${t("title")} #${id}`} className="px-5 md:px-0" />;
}

function InfoBanner({ isPayed }: { isPayed: boolean | undefined }) {
  const t = useTranslations("Order");

  return (
    <div
      className={clsx(
        "flex gap-4 items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white",
        {
          "bg-red-500": !isPayed,
          "bg-green-700": isPayed,
        }
      )}
    >
      <IoCardOutline size={30} />
      {isPayed ? <span>{t("orderPay")}</span> : <span>{t("orderNoPay")}</span>}
    </div>
  );
}

function InfoProduct({
  products,
}: {
  products:
    | {
        title: string;
        slug: string;
        images: string;
        id: string;
        quantity: number;
        price: number;
        size: Size;
        orderId: string;
        productId: string;
      }[];
}) {
  const t = useTranslations("Order");

  return (
    <>
      {products.map((product) => (
        <div key={product.slug} className="flex gap-2">
          <Image
            src={`/products/${product.images}`}
            width={100}
            height={100}
            alt={product.title}
            style={{
              objectFit: "cover",
              objectPosition: "center",
              width: 100,
              height: 100,
            }}
          />

          <div>
            <p>{product.title}</p>
            <p>
              $ {product.price} x{product.quantity}
            </p>
            <p className="font-bold">
              {t("subTotal")}:{" "}
              {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}

function InfoOrder({
  productsInCart = 0,
  subTotal = 0,
  tax = 0,
  total = 0,
  name = "",
  lastName = "",
  direction = "",
  city = "",
  country = "",
  cp = "",
  phone = "",
}: {
  productsInCart: number | undefined;
  subTotal: number | undefined;
  tax: number | undefined;
  total: number | undefined;
  name: string | undefined;
  lastName: string | undefined;
  direction: string | undefined;
  city: string | undefined;
  country: string | undefined;
  cp: string | undefined;
  phone: string | undefined;
}) {
  const t = useTranslations("Order");

  return (
    <>
      <h2 className="text-2xl font-bold">{t("direction")}</h2>

      <div className="space-y-1">
        <p className="font-bold">
          Nombre: {name} {lastName}
        </p>
        <p>Dirección: {direction}</p>
        <p>Ciudad: {city}</p>
        <p>CP: {cp}</p>
        <p>País: {country}</p>
        <p>Teléfono: {phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 bg-gray-200" />

      <div className="space-y-5">
        <h2 className="text-2xl font-bold">{t("summary")}</h2>

        <div className="grid grid-cols-2 space-y-1">
          <span>{t("quantity")}</span>
          <span className="text-right">
            {productsInCart} {t("article")}
          </span>

          <span>{t("subTotal")}</span>
          <span className="text-right">$ {subTotal}</span>

          <span>{t("tax")} (15%)</span>
          <span className="text-right">$ {tax}</span>

          <span className="text-3xl pt-5">{t("total")}:</span>
          <span className="text-right text-3xl pt-5">$ {total}</span>
        </div>
      </div>
    </>
  );
}
