import { getStockBySlug } from "@/actions";
import { useEffect, useState } from "react";

export function useStockLabel({ slug }: { slug: string }) {
  const [stock, setStock] = useState<number | string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function getStock() {
      const stock = await getStockBySlug(slug);
      setStock(stock);
    }

    getStock();

    setIsLoading(false);
  }, [slug]);

  return { isLoading, stock };
}
