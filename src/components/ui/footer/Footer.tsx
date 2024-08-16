import { titleFont } from "@/config/fonts";
import Link from "next/link";
import { FaRegCopyright } from "react-icons/fa";

export function Footer() {
  return (
    <div className=" w-full mb-2">
      <Link
        href={"#"}
        className="flex justify-center items-center text-xs gap-2"
      >
        <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
        <span>| shop</span>
        <span>
          <FaRegCopyright size={15} />
        </span>
        <span>{new Date().getFullYear()}</span>
      </Link>
    </div>
  );
}
