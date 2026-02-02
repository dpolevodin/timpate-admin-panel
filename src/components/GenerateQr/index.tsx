import { type ChangeEvent, type FC, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";

import DownloadIcon from "../../assets/download.svg";
import style from "./style.module.css";

const CoinInlineSvg = `
<svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M33 11C49.7062 11 63.25 18.3865 63.25 27.5V38.5C63.25 47.6135 49.7062 55 33 55C16.5907 55 3.234 47.8748 2.76375 38.9868L2.75 38.5V27.5C2.75 18.3865 16.2938 11 33 11ZM33 44C22.77 44 13.7225 41.2308 8.25 36.9875V38.5C8.25 43.6755 18.9282 49.5 33 49.5C46.7775 49.5 57.3045 43.9175 57.7363 38.8245L57.75 38.5L57.7527 36.9875C52.2802 41.228 43.2327 44 33 44ZM33 16.5C18.9282 16.5 8.25 22.3245 8.25 27.5C8.25 32.6755 18.9282 38.5 33 38.5C47.0718 38.5 57.75 32.6755 57.75 27.5C57.75 22.3245 47.0718 16.5 33 16.5Z" fill="#49CDFE"/>
</svg>

`;

const svgToDataUrl = (svgString: string): string => {
  const cleanedSvg = svgString
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .trim();

  return `data:image/svg+xml;base64,${btoa(cleanedSvg)}`;
};

export const GenerateQr: FC = () => {
  const [value, setValue] = useState("");
  const qrForDownloadRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const downloadAsPng = async () => {
    if (qrForDownloadRef.current) {
      try {
        const canvas = await html2canvas(qrForDownloadRef.current, {
          useCORS: true,
          backgroundColor: null,
          width: 1748,
          height: 2480,
          scale: 1,
        });

        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `tipmate_qr.png`;
        link.click();
      } catch (error) {
        console.error("Error generating PNG:", error);
      }
    }
  };
  return (
    <div className={style.container}>
      <div className={style.text}>
        Paste your link to generate and download the QR code as png
      </div>

      <input
        onChange={handleChange}
        placeholder={"https://pay.tipmate.me/tip/1000"}
        className={style.input}
      />

      {value && (
        <div className={style.qrContainer}>
          <div className={style.download} onClick={downloadAsPng}>
            Download QR <DownloadIcon />
          </div>

          <div className={style.qrWrapper}>
            <div ref={qrForDownloadRef}>
              <QRCodeSVG
                value={value}
                size={700}
                imageSettings={{
                  src: svgToDataUrl(CoinInlineSvg),
                  width: 80,
                  height: 80,
                  excavate: true,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
