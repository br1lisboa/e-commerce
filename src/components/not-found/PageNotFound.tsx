import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { titleFont } from "@/config/fonts";

export function PageNotFound() {
  const t = useTranslations("PageNotFound");

  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">{t("title")}</p>
        <p className="font-light">
          <span>{t("subtitle")}</span>
          <Link href="/" className="font-normal hover:underline transition-all">
            {t("button")}
          </Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="Starman"
          className="p-5 sm:p-0"
          width={550}
          height={550}
        />
      </div>
    </div>
  );
}
