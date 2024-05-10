import { getAllProducts } from "@/actions/products";
import { H3 } from "@/components/headings";
import { ImageGrid } from "@/components/image-grid";
import Link from "next/link";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <ImageGrid>
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/${product.name.replaceAll(" ", "-")}` || ""}
          className="flex flex-col gap-2"
        >
          <img
            className="aspect-square w-full object-cover"
            src={product.imageUrl || ""}
            alt={"Image"}
          />
          <H3>{product.name || ""}</H3>
        </Link>
      ))}
    </ImageGrid>
  );
}
