import { SideBar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <SideBar />
      
      <div className="px-5">{children}</div>
    </main>
  );
}
