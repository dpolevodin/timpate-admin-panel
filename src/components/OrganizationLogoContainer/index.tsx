import { type ChangeEvent, type FC, useRef, useState } from "react";

import style from "./style.module.css";

export const OrganizationLogoContainer: FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "image/jpeg") {
      alert("JPG/JPEG only");
      return;
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  return (
    <div className={style.container}>
      <div className={style.text}>
        Paste your link to generate and download the QR code as png
      </div>
      <div className={style.download} onClick={openFileDialog}>
        Upload JPG
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      {imageUrl && (
        <div className={style.organizationImage}>
          <img
            className={style.organizationImageSource}
            alt="organization-image"
            src={imageUrl}
          />
        </div>
      )}
    </div>
  );
};
