"use client";

import { HtmlHTMLAttributes } from "react";
import { Control, Controller, Path } from "react-hook-form";

type TInputCheckElement<T> = HtmlHTMLAttributes<HTMLInputElement> & {
  label?: string;
  control: Control<any>;
  name: Path<T>;
};

export function InputCheckElement<T>(props: TInputCheckElement<T>) {
  const { label = "", control, name, ...rest } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <div className="flex gap-4">
            <input
              type="checkbox"
              className="cursor-pointer"
              onChange={(e) => field.onChange(e.target.checked)}
              checked={field.value}
              {...rest}
            />

            {label && <p>{label}</p>}
          </div>
        );
      }}
    />
  );
}
