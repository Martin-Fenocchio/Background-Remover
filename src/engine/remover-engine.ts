import {
  AutoModel,
  AutoProcessor,
  env,
  PreTrainedModel,
  RawImage
} from "@huggingface/transformers";

export const processImages = async ({
  images,
  setProcessedImages,
  modelRef,
  processorRef
}: {
  images: string[];
  setProcessedImages: React.Dispatch<React.SetStateAction<string[]>>;
  modelRef: React.MutableRefObject<PreTrainedModel | null>;
  processorRef: React.MutableRefObject<AutoProcessor | null>;
}) => {
  const model: any = modelRef.current!;
  const processor: any = processorRef.current!;

  for (let i = 0; i < images.length; ++i) {
    // Load image
    const img = await RawImage.fromURL(images[i]);

    // Pre-process image
    const { pixel_values } = await processor(img);

    // Predict alpha matte
    const { output } = await model({ input: pixel_values });

    const maskData = (
      await RawImage.fromTensor(output[0].mul(255).to("uint8")).resize(
        img.width,
        img.height
      )
    ).data;

    // Create new canvas
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;

    // Draw original image output to canvas
    ctx.drawImage(img.toCanvas(), 0, 0);

    // Update alpha channel
    const pixelData = ctx.getImageData(0, 0, img.width, img.height);
    for (let i = 0; i < maskData.length; ++i) {
      pixelData.data[4 * i + 3] = maskData[i];
    }
    ctx.putImageData(pixelData, 0, 0);
    setProcessedImages((prevProcessed) => [
      ...prevProcessed,
      canvas.toDataURL("image/png")
    ]);
  }
};

export const startEngine = async ({
  modelRef,
  processorRef
}: {
  modelRef: React.MutableRefObject<PreTrainedModel | null>;
  processorRef: React.MutableRefObject<AutoProcessor | null>;
}) => {
  const model_id = "Xenova/modnet";

  env!.backends!.onnx!.wasm!.proxy = false;

  modelRef.current ??= await AutoModel.from_pretrained(model_id, {
    device: "webgpu"
  });

  processorRef.current ??= await AutoProcessor.from_pretrained(model_id);
};
