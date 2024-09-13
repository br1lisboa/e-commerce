import { auth } from "@/auth.config";
import { useLocale } from "next-intl";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect(`/`);
  }

  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] ">{children}</div>
    </main>
  );
}
