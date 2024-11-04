"use client";

import { HtmlHTMLAttributes } from "react";
import { Control, Controller, Path } from "react-hook-form";

type TInputImageElement<T> = HtmlHTMLAttributes<HTMLImageElement> & {
  control: Control;
  name: Path<T>;
};

export function InputImageElement<T>({ control, name }: TInputImageElement<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={(field) => {
        return (
          <div className="flex flex-col mb-2">
            <span>Fotos</span>
            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
              onChange={(e) => {
                field.field.onChange(
                  e.target.files ? Array.from(e.target.files) : []
                );
              }}
            />
          </div>
        );
      }}
    />
  );
}
