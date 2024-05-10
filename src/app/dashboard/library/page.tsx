import { getUserProducts } from "@/actions/products";
import { getUserData } from "@/actions/users";
import { H3 } from "@/components/headings";
import { ImageGrid } from "@/components/image-grid";
import Link from "next/link";
import Image from "next/image";

export default async function LibraryPage() {
  await getUserData();
  const products = await getUserProducts();

  return (
    <div className="flex flex-col">
      <ImageGrid>
        {products.map((product) => (
          <Link
            key={product.id}
            href={
              `/dashboard/library/${product.name.replaceAll(" ", "-")}` || ""
            }
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
    </div>
  );
}
