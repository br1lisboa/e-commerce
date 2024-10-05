import { useTranslations } from "next-intl";

import { Title } from "@/components";
import { AddressFrom } from "./ui/AddressFrom";
import { getAddress, getAllCountries } from "@/actions";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

function TitlePage() {
  const t = useTranslations("Checkout.address");

  return <Title title={t("title")} subtitle={t("subTitle")} />;
}

export default async function AddressPage() {
  const countries = await getAllCountries();

  const session = await auth();

  const address = await getAddress();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <TitlePage />

        <AddressFrom
          countries={countries}
          session={session}
          address={address}
        />
      </div>
    </div>
  );
}
