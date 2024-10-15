import Picture from "../../assets/icons/picture-icon.svg";

interface Props {
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
  getRootProps: () => any;
  getInputProps: () => any;
}

function DragZone({
  isDragActive,
  isDragAccept,
  isDragReject,
  getRootProps,
  getInputProps
}: Props) {
  return (
    <div
      {...getRootProps()}
      className={`drag-zone p-8 mb-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors duration-300 ease-in-out
    ${isDragAccept ? "border-green-500 bg-green-900/20" : ""}
    ${isDragReject ? "border-red-500 bg-red-900/20" : ""}
    ${
      isDragActive
        ? "border-blue-500 bg-blue-900/20"
        : "border-[#0fff9a] hover:bg-blue-900/10"
    }
  `}
    >
      <input {...getInputProps()} className="hidden" />
      <img src={Picture} />
      <p className="text-lg mb-2">
        {isDragActive ? "Sueltalas..." : "Puedes soltar imagenes aquí"}
      </p>
      <p className="text-sm text-gray-400">
        o haz click aquí para seleccionarlas
      </p>
    </div>
  );
}

export default DragZone;
