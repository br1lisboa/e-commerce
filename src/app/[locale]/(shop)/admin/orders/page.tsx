import { getAllOrders } from "@/actions/order/get-all-orders";
import { TableOrders } from "@/components";
import { redirect } from "next/navigation";

export default async function () {
  const { ordersWithNames, ok } = await getAllOrders();

  if (!ok) {
    redirect("/");
  }

  return (
    <TableOrders
      title="Mantenimiento de todas las ordenes - ADMIN"
      orders={ordersWithNames}
    />
  );
}
