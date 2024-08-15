import { notFound } from "next/navigation";

const ALLOWED_CATEGORIES = ["men", "women"];

interface Props {
  params: {
    id: string;
  };
}

export default function ({ params: { id } }: Props) {
  if (!ALLOWED_CATEGORIES.includes(id)) notFound();

  return <div>CategoryPage {id}</div>;
}
