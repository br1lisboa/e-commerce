import { auth } from "@/auth.config";
import { SideBarItems } from "./SideBarItems";

export async function SideBar() {
  const session = await auth();

  const isAuthenticated = Boolean(session?.user);
  const isAdmin = session?.user.role === "admin";

  return <SideBarItems isAdmin={isAdmin} isAuthenticated={isAuthenticated} />;
}
