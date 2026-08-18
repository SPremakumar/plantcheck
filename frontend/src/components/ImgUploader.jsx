import React, { useState, useCallback, useRef } from "react";
import { Upload, ImageOff } from "lucide-react";

function ImgUploader({ onImageSelected }) {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFile = useCallback(
    (file) => {
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        setError("Merci de sélectionner un fichier image (jpg, png...).");
        return;
      }
      setError(null);
      const url = URL.createObjectURL(file);
      setPreview(url);
      onImageSelected?.(file, url);
    },
    [onImageSelected]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div className="uploader">
      <p className="uploader-label">🍃Échantillon 🍃</p>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`uploader-dropzone ${isDragging ? "dragging" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="uploader-input"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {preview ? (
          <img src={preview} alt="Aperçu" className="uploader-preview" />
        ) : (
          <>
            <div className="uploader-icon-circle">
              <Upload className="uploader-icon" />
            </div>
            <p className="uploader-text-main">Déposez une image ici</p>
            <p className="uploader-text-sub">
              ou cliquez pour parcourir vos fichiers
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="uploader-error">
          <ImageOff size={16} /> {error}
        </p>
      )}
    </div>
  );
}

export default ImgUploader;