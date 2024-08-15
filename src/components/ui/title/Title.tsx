import { titleFont } from "@/config/fonts";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Title({ title, subtitle, className }: Props) {
  return (
    <div className={`flex flex-col gap-5 my-5 ${className}`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold`}
      >
        {title}
      </h1>

      {subtitle && <h3 className="text-xl">{subtitle}</h3>}
    </div>
  );
}
