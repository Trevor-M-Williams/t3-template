import { getAllProducts } from "@/actions/products";
import { H3 } from "@/components/headings";
import { ImageGrid } from "@/components/image-grid";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <ImageGrid>
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/dashboard/${product.name.replaceAll(" ", "-")}` || ""}
          className="relative flex w-full flex-col gap-2"
        >
          <Image
            className="aspect-square w-full object-cover"
            src={product.imageUrl || ""}
            alt={product.name}
            height={320}
            width={320}
            draggable={false}
          />
          <H3>{product.name || ""}</H3>
        </Link>
      ))}
    </ImageGrid>
  );
}
