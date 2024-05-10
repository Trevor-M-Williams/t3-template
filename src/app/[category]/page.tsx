import { getWatermarkedCategoryImages } from "@/actions/images";
import { getStripeUrl } from "@/actions/products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ImageGrid } from "@/components/image-grid";
import { auth } from "@clerk/nextjs/server";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const images = await getWatermarkedCategoryImages(
    category.replaceAll("-", " "),
  );
  let buttonUrl;

  const { userId } = auth();

  if (userId) {
    buttonUrl = await getStripeUrl(category.replaceAll("-", " "));
  } else {
    buttonUrl = "/sign-in";
  }

  return (
    <div className="relative h-full w-full">
      <Button asChild className="absolute right-0 top-0 translate-y-[-3rem]">
        <Link href={buttonUrl}>Buy</Link>
      </Button>

      <ImageGrid>
        {images.map((image) => (
          <Image
            className="aspect-square w-full object-cover"
            src={image.url || ""}
            alt={image.id.toString()}
            height={320}
            width={320}
            draggable={false}
          />
        ))}
      </ImageGrid>
    </div>
  );
}
