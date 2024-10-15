import ChromeLogo from "../../../assets/icons/chrome.svg";
import FirefoxLogo from "../../../assets/icons/firefox.svg";
import SafariLogo from "../../../assets/icons/safari.svg";
import EdgeLogo from "../../../assets/icons/edge.svg";

function WebgpuiNoSopportedFeedback() {
  const data = [
    {
      label: "Chrome",
      logo: ChromeLogo,
      minVersion: "113"
    },
    {
      label: "Firefox",
      logo: FirefoxLogo,
      enabled: false
    },
    {
      label: "Safari",
      logo: SafariLogo,
      minVersion: "16"
    },
    {
      label: "Edge",
      logo: EdgeLogo,
      minVersion: "113"
    }
  ];

  return (
    <main className="min-h-screen  text-white ">
      <div className="line" />
      <h3>Borrados de fondos de imagenes</h3>
      <h5>Gratuito, sencillo y privado.</h5>

      <article className="webgpu-info">
        <h4>WebGPU no es soportado por tu navegador :(</h4>
        <p>
          Este sitio web utiliza WebGPU para procesar las imagenes de forma
          rapida y privada. Para poder utilizar esta herramienta, debes
          actualizar tu navegador a uno que soporte WebGPU.
        </p>

        <div className="grid">
          {data.map(({ label, logo, minVersion }) => (
            <div className="browser">
              <div className="left-row">
                <img src={logo} alt={label} />
                <h5>{label}</h5>
              </div>
              <p>
                {minVersion ? (
                  <span className="text-green-400">
                    Version minima: {minVersion}
                  </span>
                ) : (
                  <span className="text-red-400">No soportado</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </article>
    </main>
  );
}

export default WebgpuiNoSopportedFeedback;
