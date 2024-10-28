"use client";
export const revalidate = 0;

import { changeUserRole } from "@/actions";
import { Title } from "../ui/title/Title";

export function TableUsers({
  users = [],
  title,
}: {
  users:
    | {
        id: string;
        name: string;
        email: string;
        role: "admin" | "user";
      }[]
    | undefined;
  title: string;
}) {
  async function changeRole(id: string, role: "admin" | "user") {
    await changeUserRole(id, role);
  }

  return (
    <>
      <Title title={title} />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre y Apellido
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Email
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Rol
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {user.name}
                </td>
                <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <select
                    className="text-sm text-gray-900 py-2 px-4 rounded-sm w-full"
                    value={user.role}
                    onChange={(e) =>
                      changeRole(user.id, e.target.value as "admin" | "user")
                    }
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
