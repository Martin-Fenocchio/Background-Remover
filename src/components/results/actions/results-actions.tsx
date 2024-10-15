import { downloadAsZip } from "../../../utils/misc/misc-utils";

interface Props {
  isProcessing: boolean;
  images: string[];
  processImages: () => void;
  processedImages: string[];
  isDownloadReady: boolean;
  clearAll: () => void;
}

function ResultsActions({
  isProcessing,
  images,
  processImages,
  isDownloadReady,
  processedImages,
  clearAll
}: Props) {
  if (isProcessing) return <></>;

  const deletePhotosButton = (
    <button onClick={clearAll} className="delete-button">
      <i className="fa-solid fa-trash-can"></i>
      Borrar fotos
    </button>
  );

  return (
    <div className="results-actions flex flex-row items-center gap-4 mb-8">
      {processedImages.length > 0 ? (
        <>
          <button
            onClick={() => downloadAsZip(images, processedImages)}
            disabled={!isDownloadReady}
            className="download-button px-3 py-1  text-white rounded-md focus:outline-none focus:ring-2  disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors duration-200 text-sm"
          >
            <i className="fa-solid fa-download"></i>
            Descargar imagenes
          </button>

          {deletePhotosButton}
        </>
      ) : (
        <>
          <button
            onClick={processImages}
            disabled={isProcessing || images.length === 0}
            className="process-button"
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            {isProcessing ? "Borrando fondos..." : "Eliminar fondos"}
          </button>

          {deletePhotosButton}
        </>
      )}
    </div>
  );
}

export default ResultsActions;
