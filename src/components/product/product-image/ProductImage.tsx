import Image from "next/image";

type TProductImage = {
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  src?: string;
  alt: string;
  width: number;
  height: number;
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
};

export function ProductImage({
  className,
  src,
  alt,
  width,
  height,
  style,
}: TProductImage) {
  const localSrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  return (
    <Image
      src={localSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
    />
  );
}
