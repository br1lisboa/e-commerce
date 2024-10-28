import { getAllUsers } from "@/actions";
import { TableUsers } from "@/components/table/TableUsers";
import { redirect } from "next/navigation";

export default async function () {
  const { ok, users } = await getAllUsers();

  if (!ok) {
    redirect("/");
  }

  if (!users) {
    return <div>No existen usuarios activos</div>;
  }

  return (
    <>
      <TableUsers users={users} title={"Mantenimiento Usuarios"} />
    </>
  );
}
