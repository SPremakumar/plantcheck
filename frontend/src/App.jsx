import React, { useState } from "react";
import ImgUploader from "./components/ImgUploader";
import DisplayPrediction from "./components/DisplayPrediction";
import "./index.css";
import "./App.css";

export default function App() {
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

  const handleImageSelected = async (file) => {
    setIsLoading(true);
    setPrediction(null);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/prediction", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data); // data = { host: {...}, disease: {...} }
    } 

    catch (err) {
      setError("Impossible d'obtenir une prédiction. Vérifiez que l'API tourne.");
      console.error(err);
    } 

    finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="app">
      <div className="app-header">
        <p className="app-eyebrow">Identification d'espèces & santé végétale</p>
        <h1 className="app-title">Diagnostic de plante</h1>
      </div>

      <ImgUploader onImageSelected={handleImageSelected} />
      {error && <p className="uploader-error">{error}</p>}
      <DisplayPrediction prediction={prediction} isLoading={isLoading} />
    </div>
  );
}