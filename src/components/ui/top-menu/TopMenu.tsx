import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

import { titleFont } from "@/config/fonts";
import { MenuButton } from "./MenuButton";

const CENTER_MENU = [
  { title: "men", href: "/category/men" },
  { title: "women", href: "/category/women" },
  { title: "kids", href: "/category/kid" },
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
            Teslo
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

        <Link
          className="relative m-2 rounded-md transition-all hover:bg-gray-100"
          href={`${locale}/cart`}
        >
          <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-500 text-white">
            3
          </span>
          <IoCartOutline className="w-5 h-5" />
        </Link>

        <MenuButton />
      </div>
    </nav>
  );
}
