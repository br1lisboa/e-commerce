"use client";

import { useUIStore } from "@/store";
import { useTranslations } from "next-intl";

export function MenuButton() {
  const t = useTranslations("TopMenu");

  const { openSideMenu } = useUIStore();

  return (
    <button
      className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
      onClick={openSideMenu}
    >
      {t("menu")}
    </button>
  );
}
