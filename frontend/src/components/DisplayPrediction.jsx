import React from "react";
import { CheckCircle2, AlertTriangle, Microscope, Leaf, Stethoscope } from "lucide-react";
import OutputBlock from "./OutputBlock";

function DisplayPrediction({ prediction, isLoading }) {
  if (isLoading) {
    return (
      <div className="prediction">
        <div className="prediction-header">
          <div
            className="prediction-icon-circle"
            style={{ animation: "pulse 1.5s ease-in-out infinite" }}
          />
          <div
            className="prediction-skeleton-row"
            style={{ width: "6rem" }}
          />
        </div>
        <div className="prediction-skeleton-row" style={{ marginBottom: "0.75rem" }} />
        <div
          className="prediction-skeleton-row"
          style={{ width: "80%", marginBottom: "0.75rem" }}
        />
        <div className="prediction-skeleton-row" style={{ width: "60%" }} />
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="prediction-empty">
        <Microscope className="prediction-empty-icon" />
        <p className="prediction-empty-text">
          En attente d'un échantillon à analyser.
        </p>
      </div>
    );
  }

  const { host, disease } = prediction;

  return (
    <div className="prediction">

      <OutputBlock
        icon={Leaf}
        title="🪴 Espèce 🪴"
        label={host.label}
        confidence={host.confidence}
        allProbabilities={host.all_probabilities}
      />

      <div className="prediction-divider" />

      <OutputBlock
        icon={disease.label === "healthy" ? CheckCircle2 : Stethoscope}
        title="🩺 État sanitaire 🩺"
        label={disease.label}
        confidence={disease.confidence}
        allProbabilities={disease.all_probabilities}
      />
    </div>
  );

}

export default DisplayPrediction;