export const revalidate = 0;

import { getOrderByUser } from "@/actions";
import { Title } from "@/components";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

export default async function () {
  const { ordersByUser, ok } = await getOrderByUser();

  if (!ok) {
    redirect("/");
  }

  return <Table orders={ordersByUser} />;
}

function Table({
  orders = [],
}: {
  orders: { id: string; isPaid: boolean; OrderAddress: any }[] | undefined;
}) {
  const t = useTranslations("Table");
  const locale = useLocale();

  return (
    <>
      <Title title={t("title")} />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                {t("id")}
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                {t("nameLastName")}
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                {t("state")}
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                {t("options")}
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.OrderAddress.name} {order.OrderAddress.lastName}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.isPaid ? (
                    <>
                      <IoCardOutline className="text-green-800" />
                      <span className="mx-2 text-green-800">{t("payed")}</span>
                    </>
                  ) : (
                    <>
                      <IoCardOutline className="text-red-800" />
                      <span className="mx-2 text-red-800">{t("noPayed")}</span>
                    </>
                  )}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link
                    href={`/${locale}/orders/${order.id}`}
                    className="hover:underline"
                  >
                    {t("detail")}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
