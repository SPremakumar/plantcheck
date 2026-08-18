import React from "react";
import { AlertTriangle } from "lucide-react";

export default function OutputBlock({ icon: Icon, title, label, confidence, allProbabilities = {} }) {
  const isLowConfidence = confidence < 50;

  // Convertit l'objet { label: 12.3 } en liste triée par valeur décroissante
  const sortedProbabilities = Object.entries(allProbabilities)
    .map(([itemLabel, itemValue]) => ({ label: itemLabel, value: itemValue }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="prediction-block">
      <p className="prediction-eyebrow">{title}</p>

      <div className="prediction-header">
        <div className="prediction-icon-circle">
          <Icon className="prediction-icon" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 className="prediction-label">{label}</h3>
          <span className="prediction-confidence">{confidence}%</span>
        </div>
      </div>

      {sortedProbabilities.length > 0 && (
        <ul className="prediction-topk">
          {sortedProbabilities.map((item) => (
            <li key={item.label} className="prediction-topk-item">
              <span className="prediction-topk-label">{item.label}</span>
              <div className="prediction-topk-bar-track">
                <div
                  className="prediction-topk-bar-fill"
                  style={{ width: `${item.value}%` }}
                />
              </div>
              <span className="prediction-topk-value">{item.value}%</span>
            </li>
          ))}
        </ul>
      )}

      {isLowConfidence && (
        <p className="prediction-warning">
          <AlertTriangle size={14} /> Confiance faible, résultat à vérifier.
        </p>
      )}
    </div>
  );
}