import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function ({ children }: { children: React.ReactNode }) {
  const session = await auth();
  const isAdmin = session?.user.role === "admin";

  if (!isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}
