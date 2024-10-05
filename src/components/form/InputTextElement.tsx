"use client";

import clsx from "clsx";
import { HtmlHTMLAttributes } from "react";
import { Control, Controller, Path } from "react-hook-form";

type TInputTextElement<T> = HtmlHTMLAttributes<HTMLInputElement> & {
  label: string;
  control: Control<any>;
  name: Path<T>;
};

export function InputTextElement<T>(props: TInputTextElement<T>) {
  const { label, control, name, ...rest } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <div className="flex flex-col mb-2">
            <span>{label}</span>
            <input
              type="text"
              className={clsx("p-2 border rounded-md bg-gray-200", {
                "border-red-300": fieldState.error !== undefined,
              })}
              value={field.value}
              onChange={field.onChange}
              {...rest}
            />
          </div>
        );
      }}
    />
  );
}
