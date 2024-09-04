"use client";

import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { generatePagination } from "@/utils";

type PaginationProps = {
  totalPages: number;
};

export function Pagination({ totalPages }: PaginationProps) {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const currentPage =
    Number(searchParams.get("page") ? searchParams.get("page") : 1) ?? 1;
  const allPages = generatePagination(currentPage, totalPages);

  function createPageUrl(pageNumber: number | string): string {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") `${pathName}?${params.toString()}`;

    if (Number(pageNumber) <= 0) return `${pathName}`;

    if (Number(pageNumber) > totalPages) `${pathName}?${params.toString()}`;

    params.set("page", String(pageNumber));
    return `${pathName}?${params.toString()}`;
  }

  if (currentPage < 1 || isNaN(currentPage)) {
    redirect(`${pathName}?page=1`);
  }

  return (
    <div className="flex text-center justify-center mt-5 mb-12">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item">
            <ArrowPagination href={createPageUrl(currentPage - 1)}>
              <IoChevronBackOutline size={25} />
            </ArrowPagination>
          </li>

          {allPages.map((page, index) => (
            <li className="page-item active" key={index}>
              <NumberPagination
                href={createPageUrl(page)}
                activeClass={page === currentPage}
              >
                {page}
              </NumberPagination>
            </li>
          ))}

          <li className="page-item">
            <ArrowPagination href={createPageUrl(currentPage + 1)}>
              <IoChevronForwardOutline size={25} />
            </ArrowPagination>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function ArrowPagination({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      className="page-link relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
      href={href}
    >
      {children}
    </Link>
  );
}

function NumberPagination({
  children,
  activeClass,
  href,
}: {
  children: React.ReactNode;
  activeClass?: boolean;
  href: string;
}) {
  return (
    <Link
      className={clsx(
        "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
        { "bg-gray-700 text-white": activeClass }
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
