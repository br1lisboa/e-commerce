const MAX_PAGES = 7;
const MAX_PAGES_WHIT_DOTS = 3;

export function generatePagination(currentPage: number, totalPage: number) {
  // Si el total de paginas es igual o menor a 7 mostraremos todas.
  if (totalPage <= MAX_PAGES)
    return Array.from({ length: totalPage }, (_, index) => index + 1);

  // Si la pagina actual esta entre las primeras 3 paginas, mostrar las primeras 3 ... y las ultimas 2...
  if (currentPage <= MAX_PAGES_WHIT_DOTS)
    [1, 2, 3, "...", totalPage - 1, totalPage];

  // Su la pagina actual esta entre las ultimas 3 paginas
  if (currentPage > totalPage - MAX_PAGES_WHIT_DOTS) {
    [1, 2, "...", totalPage - 2, totalPage - 1, totalPage];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPage,
  ];
}
