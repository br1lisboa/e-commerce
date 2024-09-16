import clsx from "clsx";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type TInputElement<T extends FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> & {
    control: Control<T>;
    name: Path<T>;
    label: string;
    type: "text" | "email" | "password";
  };

export function Input<T extends FieldValues>({
  name,
  control,
  label,
  type,
}: TInputElement<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <>
            <label htmlFor={name}>{label}</label>
            <input
              className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5", {
                "border-red-600 bg-red-100": error !== undefined,
              })}
              autoFocus
              type={type}
              value={value}
              onChange={onChange}
            />
          </>
        );
      }}
    />
  );
}
