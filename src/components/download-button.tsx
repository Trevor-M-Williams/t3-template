"use client";
import { Button } from "@/components/ui/button";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export function DownloadButton({
  imageUrls,
  category,
}: {
  imageUrls: string[];
  category: string;
}) {
  async function handleDownload() {
    const zip = new JSZip();

    const imgFolder = zip.folder(`${category}-mockups`);

    await Promise.all(
      imageUrls.map(async (url, index) => {
        const response = await fetch(url);
        const blob = await response.blob();
        imgFolder?.file(`${category}-mockup-${index + 1}.jpg`, blob);
      }),
    );

    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${category}-mockups.zip`);
  }

  return (
    <Button
      className="absolute right-0 top-0 translate-y-[-3rem]"
      onClick={handleDownload}
    >
      Download
    </Button>
  );
}
