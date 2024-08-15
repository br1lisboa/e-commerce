import { TopMenu } from "@/components";

export default function ShopLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  console.log(locale, "desde layout de shop");

  return (
    <main className="min-h-screen">
      <TopMenu locale={locale}/>
      <div className="md:px-5">{children}</div>
    </main>
  );
}
