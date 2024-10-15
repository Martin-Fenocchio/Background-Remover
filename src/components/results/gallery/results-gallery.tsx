import { useEffect, useState } from "react";
import { copyToClipboard, downloadImage } from "../../../utils/misc/misc-utils";

interface Props {
  images: string[];
  processedImages: string[];
  removeImage: (index: number) => void;
  isProcessing: boolean;
}

function ResultsGallery({
  images,
  processedImages,
  removeImage,
  isProcessing
}: Props) {
  const [showInAnimation, setShowInAnimation] = useState(false);
  const [showOutAnimation, setShowOutAnimation] = useState(false);

  const getAnimationSquare = (animation: string) => {
    return (
      <div
        transition-style={animation}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "0.5rem",
            background: "#0fff9a"
          }}
        ></div>
      </div>
    );
  };

  useEffect(() => {
    if (isProcessing) {
      console.log("entering");
      setShowOutAnimation(false);

      setShowInAnimation(true);
    } else if (!isProcessing && showInAnimation) {
      console.log("closing");

      setShowInAnimation(false);
      setShowOutAnimation(true);
    }
  }, [isProcessing]);

  return (
    <div className="gap-6 results-gallery">
      {images.map((src, index) => (
        <div key={index} className="relative group">
          <img
            src={processedImages[index] || src}
            alt={`Image ${index + 1}`}
            className="rounded-lg object-cover w-full h-48"
          />
          {processedImages[index] && (
            <div className="photo-actions absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <i
                className="fa-solid fa-download cursor-pointer"
                onClick={() => downloadImage(processedImages[index] || src)}
              ></i>
              <i
                className="fa-regular fa-copy"
                onClick={() => copyToClipboard(processedImages[index] || src)}
              ></i>
            </div>
          )}
          <button
            onClick={() => removeImage(index)}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-opacity-70"
            aria-label={`Remove image ${index + 1}`}
          >
            &#x2715;
          </button>

          {showInAnimation && getAnimationSquare("in:circle:center")}
          {showOutAnimation && getAnimationSquare("out:circle:center")}

          <div
            className="loader-container"
            style={{ opacity: showInAnimation ? 1 : 0 }}
          >
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black mb-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultsGallery;
