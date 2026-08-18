from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
import numpy as np
import os


# Création de l'application web flask
app = Flask(__name__)
# Autorise aux front-end (React) à faire des requêtes vers cette API
CORS(app, origins=["http://localhost:5173"]) # url de react


# Importation le modèle CNN :
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "plant_disease_model_[270726]_V2.keras")
model = tf.keras.models.load_model(MODEL_PATH)

# Les dictionnaires représentant l'index et leurs host ou disease associés :
int_to_disease = {
    0: "Apple scab",
    1: "Bacterial spot",
    2: "Black rot",
    3: "Cedar apple rust",
    4: "Cercospora leaf spot Gray leaf spot",
    5: "Common rust",
    6: "Early blight",
    7: "Esca (Black Measles)",
    8: "Haunglongbing (Citrus greening)",
    9: "Late blight",
    10: "Leaf Mold",
    11: "Leaf blight (Isariopsis Leaf Spot)",
    12: "Leaf scorch",
    13: "Northern Leaf Blight",
    14: "Powdery mildew",
    15: "Septoria leaf spot",
    16: "Spider mites Two-spotted spider mite",
    17: "Target Spot",
    18: "Tomato Yellow Leaf Curl Virus",
    19: "Tomato mosaic virus",
    20: "healthy"
}
int_to_host = {
    0: "Apple",
    1: "Blueberry",
    2: "Cherry (including sour)",
    3: "Corn (maize)",
    4: "Grape",
    5: "Orange",
    6: "Peach",
    7: "Pepper, bell",
    8: "Potato",
    9: "Raspberry",
    10: "Soybean",
    11: "Squash",
    12: "Strawberry",
    13: "Tomato"
}


# Traitement d'une image :
def preprocess_img() :
	file = request.files["file"]
	img = Image.open(file.stream).convert('RGB').resize((256, 256))
	img_array = np.array(img)
	img_batch = np.expand_dims(img_array, axis=0)
	return img_batch


# Traitement de la prédiction avec le modèle CNN créé : 
def _predict(img) :
	predictions = model.predict(img) # applique la prédiction et enregistre le rst dans une liste (=predicion)
	return predictions


# Format les résultats de "predictions" en JSON (pour envoyer au React) :
def _format(predictions) :
	# Les sorties host et disease sous forme listes : host_output_pred et disease_output_pred
	host_output_pred = predictions[0][0]
	disease_output_pred = predictions[1][0]

	# Les gagnants :
	host_idx = np.argmax(predictions[0], axis=-1)[0]
	disease_idx = np.argmax(predictions[1], axis=-1)[0]

	# Conversion des probabilités en pourcentages numériques (float, 2 décimales)
	host_probabilities_dict = {
		int_to_host[i]: round(float(prob) * 100, 2)
		for i, prob in enumerate(host_output_pred)
	}
	disease_probabilities_dict = {
		int_to_disease[i]: round(float(prob) * 100, 2)
		for i, prob in enumerate(disease_output_pred)
	}

	# Construction du dictionnaire de retour
	return jsonify({
		"host": {
			"label": int_to_host[host_idx],
			"confidence": round(float(predictions[0][0][host_idx]) * 100, 2),
			"all_probabilities": host_probabilities_dict
			},
		"disease": {
			"label": int_to_disease[disease_idx],
			"confidence": round(float(predictions[1][0][disease_idx]) * 100, 2),
			"all_probabilities": disease_probabilities_dict
		}
	})


# Gestion de la communication avec react (http://localhost:5000/api/prediction)
@app.route("/api/prediction", methods=["POST"])
def ex_commnication() :
	img = preprocess_img()
	predictions = _predict(img)
	rst = _format(predictions)
	return rst



# Execute le serveur Flask
if __name__ == "__main__":
    app.run(port=5000, debug=True)