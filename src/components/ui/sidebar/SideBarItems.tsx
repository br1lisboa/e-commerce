"use client";

import { logout } from "@/actions";
import { useUIStore } from "@/store";
import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Fragment } from "react";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

const MENU_ITEMS = [
  {
    icon: <IoPersonOutline size={30} />,
    title: "perfil",
    href: "/profile",
  },
  {
    icon: <IoTicketOutline size={30} />,
    title: "orders",
    href: "/orders",
  },
  {
    icon: <IoLogInOutline size={30} />,
    title: "login",
    href: "/auth/login",
  },
  {
    icon: <IoLogOutOutline size={30} />,
    title: "logout",
    href: "/auth/login",
  },
];

const MENU_ITEMS_ADMIN = [
  {
    icon: <IoShirtOutline size={30} />,
    title: "adminProducts",
    href: "/admin/products",
  },
  {
    icon: <IoTicketOutline size={30} />,
    title: "adminOrders",
    href: "/admin/orders",
  },
  {
    icon: <IoPeopleOutline size={30} />,
    title: "adminUsers",
    href: "/admin/users",
  },
];

export function SideBarItems({
  isAuthenticated = false,
  isAdmin = false,
}: {
  isAuthenticated: boolean;
  isAdmin: boolean;
}) {
  const t = useTranslations("SideBar");

  const locale = useLocale();

  const { isSideMenuOpen, closeSideMenu } = useUIStore();

  return (
    <div>
      {isSideMenuOpen && (
        <>
          {/* Background black */}
          <div className="fixed top-0 left-0 h-screen w-screen z-10 bg-black/30" />

          {/* Background blur */}
          <div
            onClick={closeSideMenu}
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm "
          />
        </>
      )}

      {/* SideBar */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-full sm:w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "translate-x-full": !isSideMenuOpen,
            "translate-x-0": isSideMenuOpen,
          }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={closeSideMenu}
        />

        {/* Input search */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />

          <input
            type="text"
            placeholder={t("search")}
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-900 "
          />
        </div>

        {/* Menu */}
        {MENU_ITEMS.map((item) => (
          <Fragment key={item.href}>
            {isAuthenticated && item.title !== "login" && (
              <Link
                href={`/${locale}/${item.href}`}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                onClick={async () => {
                  if (item.title === "logout") {
                    await logout();
                  }
                  closeSideMenu();
                }}
              >
                {item.icon}
                <span className="ml-3 text-xl">{t(item.title)}</span>
              </Link>
            )}

            {!isAuthenticated && item.title === "login" && (
              <Link
                href={`/${locale}/${item.href}`}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                onClick={() => {
                  closeSideMenu();
                }}
              >
                {item.icon}
                <span className="ml-3 text-xl">{t(item.title)}</span>
              </Link>
            )}
          </Fragment>
        ))}

        {/* Separator */}
        <div className="w-full h-px bg-gray-200 my-10" />

        {/* Menu admin */}
        {MENU_ITEMS_ADMIN.map((item) => (
          <Fragment key={item.href}>
            {isAuthenticated && isAdmin && (
              <Link
                onClick={closeSideMenu}
                href={`/${locale}/${item.href}`}
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
              >
                {item.icon}
                <span className="ml-3 text-xl">{t(item.title)}</span>
              </Link>
            )}
          </Fragment>
        ))}
      </nav>
    </div>
  );
}
