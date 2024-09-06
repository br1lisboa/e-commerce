import clsx from "clsx";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "bg-slate-200  animate-pulse w-full h-[300px] rounded-md",
        {
          className,
        }
      )}
    ></div>
  );
}
