import { addProducts, uploadImages } from "@/actions/seed";
import { addUserProduct, getUserProducts } from "@/actions/products";
import { getUserData } from "@/actions/users";
import { H3 } from "@/components/headings";
import { ImageGrid } from "@/components/image-grid";
import { Button } from "@/components/ui/button";
import { revalidatePath } from "next/cache";
import Link from "next/link";

function AdminButtons() {
  return (
    <div className="mb-6 flex gap-2">
      <form
        action={async () => {
          "use server";
          await addProducts();
        }}
      >
        <Button>Add Products</Button>
      </form>

      <form
        action={async () => {
          "use server";
          await uploadImages();
        }}
      >
        <Button>Upload Images</Button>
      </form>

      <form
        action={async () => {
          "use server";
          addUserProduct("prod_Q4NUPKqIdztpxT");
          revalidatePath("/library");
        }}
      >
        <Button>Add Product To User</Button>
      </form>
    </div>
  );
}

export default async function LibraryPage() {
  await getUserData();
  const products = await getUserProducts();

  return (
    <div className="flex flex-col">
      {/* <AdminButtons /> */}
      <ImageGrid>
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/library/${product.name}`}
            className="flex flex-col gap-2"
          >
            <img
              className="aspect-square w-full object-cover"
              src={product.imageUrl || ""}
              alt={"Image"}
            />
            <H3>{product.name}</H3>
          </Link>
        ))}
      </ImageGrid>
    </div>
  );
}