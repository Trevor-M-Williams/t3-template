import { getCategoryImages } from "@/actions/images";
import { Button } from "@/components/ui/button";
import { ImageGrid } from "@/components/image-grid";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const images = await getCategoryImages(category);

  return (
    <div className="relative h-full w-full">
      <Button className="absolute right-0 top-0 translate-y-[-3rem]">
        Download
      </Button>
      <ImageGrid>
        {images.map((image) => (
          <img
            key={image.url}
            className="aspect-square w-full object-cover"
            src={image.url || ""}
            alt="Image"
          />
        ))}
      </ImageGrid>
    </div>
  );
}
