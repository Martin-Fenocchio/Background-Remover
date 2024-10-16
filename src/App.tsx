import { useState, useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { AutoProcessor, PreTrainedModel } from "@huggingface/transformers";
import DragZone from "./components/drag-zone/drag-zone";
import ResultsActions from "./components/results/actions/results-actions";
import ResultsGallery from "./components/results/gallery/results-gallery";
import ErrorFeedback from "./components/user-feedback/error/error-feedback";
import LoadingFeedback from "./components/user-feedback/loading/loading-feedback";
import { processImages, startEngine } from "./engine/remover-engine";
import "transition-style";
import WebgpuiNoSopportedFeedback from "./components/user-feedback/webgpui/webgpui-no-sopported-feedback";

export default function App() {
  const [images, setImages] = useState<any[]>([]);
  const [processedImages, setProcessedImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [webGPUIsSoported, setwebGPUIsSoported] = useState(true);

  const modelRef = useRef<PreTrainedModel | null>(null);
  const processorRef = useRef<AutoProcessor | null>(null);

  useEffect(() => {
    handleStartEngine();
  }, []);

  const handleStartEngine = async () => {
    try {
      const webGPUIsSoported = (navigator as any).gpu != null;

      if (!webGPUIsSoported) {
        setwebGPUIsSoported(false);
        return;
      }

      startEngine({
        modelRef,
        processorRef,
        onNoWebGPU: () => setwebGPUIsSoported(false)
      });
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: Blob[] | MediaSource[]) => {
    setImages((prevImages) => [
      ...prevImages,
      ...acceptedFiles.map((file) => URL.createObjectURL(file))
    ]);
  }, []);

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setProcessedImages((prevProcessed) =>
      prevProcessed.filter((_, i) => i !== index)
    );
  };

  const handleProcessImages = async () => {
    setIsProcessing(true);
    setProcessedImages([]);

    await processImages({
      images,
      setProcessedImages,
      modelRef,
      processorRef
    });

    setIsProcessing(false);
    setIsDownloadReady(true);
  };

  const clearAll = () => {
    setImages([]);
    setProcessedImages([]);
    setIsDownloadReady(false);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"]
    }
  });

  if (!webGPUIsSoported) return <WebgpuiNoSopportedFeedback />;

  if (error) return <ErrorFeedback error={error} />;

  if (isLoading) return <LoadingFeedback />;

  return (
    <main className="min-h-screen  text-white ">
      <div className="line" />
      <h3>Borrados de fondos de imagenes</h3>
      <h5>Gratuito, sencillo y privado.</h5>

      {images.length == 0 ? (
        <DragZone
          {...{
            isDragActive,
            isDragAccept,
            isDragReject,
            getRootProps,
            getInputProps
          }}
        />
      ) : (
        <>
          <ResultsGallery
            {...{
              images,
              processedImages,
              isProcessing,
              removeImage
            }}
          />
          <ResultsActions
            {...{
              isProcessing,
              images,
              processImages: handleProcessImages,
              processedImages,
              isDownloadReady,
              clearAll
            }}
          />
        </>
      )}

      <div className="credits">
        <p>Martín Fenocchio</p>
      </div>
    </main>
  );
}
