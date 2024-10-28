"use client";

import { HtmlHTMLAttributes } from "react";
import { Control, Controller, Path } from "react-hook-form";

type TInputTextAreaElement<T> = HtmlHTMLAttributes<HTMLAreaElement> & {
  control: Control;
  name: Path<T>;
  label?: string;
};

export function InputTextAreaElement<T>({
  control,
  name,
  label = "",
}: TInputTextAreaElement<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState, formState }) => {
        return (
          <div className="flex flex-col mb-2">
            <span>{label}</span>
            <textarea
              rows={5}
              className="p-2 border rounded-md bg-gray-200"
              value={field.value}
              onChange={field.onChange}
            />
          </div>
        );
      }}
    />
  );
}
