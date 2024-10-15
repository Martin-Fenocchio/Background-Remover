import JSZip from "jszip";
import { saveAs } from "file-saver";

export const copyToClipboard = async (url: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();

    const clipboardItem = new ClipboardItem({ [blob.type]: blob });

    await navigator.clipboard.write([clipboardItem]);
  } catch (err) {
    console.error("Failed to copy image: ", err);
  }
};

export const downloadImage = (url: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = "image.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadAsZip = async (
  images: string[],
  processedImages: string[]
) => {
  const zip = new JSZip();
  const promises = images.map(
    (image, i) =>
      new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        const img = new Image();
        img.src = processedImages[i] || image;

        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              zip.file(`image-${i + 1}.png`, blob);
            }
            resolve(null);
          }, "image/png");
        };
      })
  );

  await Promise.all(promises);

  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, "images.zip");
};
