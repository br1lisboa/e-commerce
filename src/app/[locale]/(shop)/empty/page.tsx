import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  const locale = useLocale();
  const t = useTranslations("Empty");

  return (
    <div className="flex justify-center items-center h-[800px]">
      <IoCartOutline size={80} className="mx-5" />

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl font-semibold">{t("title")}</h1>

        <Link className="text-blue-600 text-4xl" href={`/${locale}/`}>
          {t("button")}
        </Link>
      </div>
    </div>
  );
}
