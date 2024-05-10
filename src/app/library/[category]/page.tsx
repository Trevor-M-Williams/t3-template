import { getCategoryImages } from "@/actions/images";
import { ImageGrid } from "@/components/image-grid";
import { DownloadButton } from "@/components/download-button";
import Image from "next/image";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const images = await getCategoryImages(category);
  const imageUrls = images.map((image) => image.downloadUrl || "");

  return (
    <div className="relative h-full w-full">
      <DownloadButton
        imageUrls={imageUrls}
        category={category.slice(0, -1).toLowerCase().replaceAll(" ", "-")}
      />
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
