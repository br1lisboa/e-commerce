"use client";

import { Control, Controller, Path } from "react-hook-form";

type TInputCheckElement<T> = {
  control: Control;
  name: Path<T>;
  selectedElements: string[];
  availableElements: string[];
  label: string;
};

export function InputChipElement<T>({
  control,
  name,
  selectedElements = [],
  availableElements = [],
  label,
}: TInputCheckElement<T>) {
  return (
    <Controller
      name={name as string}
      control={control}
      defaultValue={selectedElements}
      render={({ field }) => (
        <>
          <span>{label}</span>

          <div className="flex flex-wrap">
            {availableElements.map((element) => (
              <div
                key={element}
                onClick={() => {
                  const newValue = field.value.includes(element)
                    ? field.value.filter((s: any) => s !== element)
                    : [...field.value, element];
                  field.onChange(newValue);
                }}
                className={`flex items-center justify-center w-10 h-10 mr-2 border rounded-md cursor-pointer ${
                  field.value.includes(element) ? "bg-blue-500 text-white" : ""
                } `}
              >
                <span>{element.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </>
      )}
    />
  );
}
