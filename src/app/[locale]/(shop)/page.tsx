import { Title } from "@/components";
import { useTranslations } from "next-intl";

export default function ShopPage() {
  const t = useTranslations("Title");

  return (
    <>
      <Title title={t("title")} subtitle={t("subtitle")} />
    </>
  );
}
