"use client";

import { useTranslations } from "next-intl";
import { HtmlHTMLAttributes } from "react";
import { Control, Controller, Path } from "react-hook-form";

type TOptions = {
  value: string;
  label: string;
};

type TInputSelectElement<T> = HtmlHTMLAttributes<HTMLSelectElement> & {
  control: Control<any>;
  name: Path<T>;
  label?: string;
  options: TOptions[] | undefined;
};

export function InputSelectElement<T>(props: TInputSelectElement<T>) {
  const { control, name, options = [], label = "" } = props;

  const t = useTranslations("Checkout.address");

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div className="flex flex-col mb-2">
            {label && <span>{label}</span>}
            <select
              onChange={(e) => field.onChange(e.target.value)}
              className="p-2 border rounded-md bg-gray-200"
              defaultValue={field.value}
            >
              <option value="">{t("select")}</option>
              {options.map(({ label, value }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        );
      }}
    />
  );
}
