import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import { Title } from "@/components";

export default function AddressPage() {
  const locale = useLocale();
  const t = useTranslations("Checkout.address");

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">
      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        <Title title={t("title")} subtitle={t("subTitle")} />

        <div className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
          <div className="flex flex-col mb-2">
            <span>{t("name")}</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>{t("lastName")}</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>{t("direction")}</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>{t("direction2")}</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>{t("cp")}</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>{t("city")}</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2">
            <span>{t("country")}</span>
            <select className="p-2 border rounded-md bg-gray-200">
              <option value="">[ {t("select")} ]</option>
              <option value="ARG">{t("ar")}</option>
              <option value="CRI">{t("cr")}</option>
              <option value="MEX">{t("mx")}</option>
              <option value="US">{t("us")}</option>
            </select>
          </div>

          <div className="flex flex-col mb-2">
            <span>{t("phone")}</span>
            <input type="text" className="p-2 border rounded-md bg-gray-200" />
          </div>

          <div className="flex flex-col mb-2 sm:mt-10">
            <Link
              href={`/${locale}/checkout`}
              className="btn-primary flex w-full sm:w-1/2 justify-center "
            >
              {t("next")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
