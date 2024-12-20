import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

import { titleFont } from "@/config/fonts";
import { MenuButton } from "./MenuButton";
import { TotalItems } from "./TotalItems";

const CENTER_MENU = [
  { title: "men", href: "/gender/men" },
  { title: "women", href: "/gender/women" },
  { title: "kids", href: "/gender/kid" },
];

export function TopMenu() {
  const locale = useLocale();
  const t = useTranslations("TopMenu");

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      {/* logo */}
      <div>
        <Link href={`/${locale}`}>
          <span className={`${titleFont.className} antialiased font-bold`}>
            Casca
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* center menu */}
      <div className="hidden sm:block">
        {CENTER_MENU.map(({ href, title }) => (
          <Link
            key={href}
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
            href={`/${locale}${href}`}
          >
            {t(title)}
          </Link>
        ))}
      </div>

      {/* search, cart, menu */}
      <div className="flex items-center">
        <Link
          className="m-2 rounded-md transition-all hover:bg-gray-100"
          href={`${locale}/search`}
        >
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <TotalItems />
        {/* <Link
          className="relative m-2 rounded-md transition-all hover:bg-gray-100"
          href={`/${locale}/{${}cart}`}
        >
          <IoCartOutline className="w-5 h-5" />
        </Link> */}

        <MenuButton />
      </div>
    </nav>
  );
}
