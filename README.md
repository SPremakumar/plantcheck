# PlantCheck 🌱

PlantCheck est une application web permettant d'identifier une plante et de détecter une éventuelle maladie à partir d'une image de feuille.

L'application utilise un modèle de Deep Learning basé sur un réseau de neurones convolutif (CNN) entraîné sur le dataset PlantVillage.

# 🎯Objectifs

PlantCheck permet de :

🌿 reconnaître l'espèce de la plante à partir d'une image de feuille.;
🩺 déterminer son état de santé ;
🔬 identifier une éventuelle maladie ;

# ⚙️ Installation
1. Cloner le projet
````git clone https://github.com/VOTRE_NOM/plantcheck.git````
````cd plantcheck````
3. Installer le frontend
````cd frontend````
````npm install````
4. Installer le backend

Revenir à la racine du projet :

````cd ..````
````cd backend````

Créer un environnement virtuel Python :

````python -m venv api_flask````

Activer l'environnement sous Windows PowerShell :

````.\api_flask\Scripts\Activate.ps1````

Installer les dépendances :

````pip install -r requirements.txt````

🚀 Lancement de l'application

## Backend

Dans un terminal :

````cd backend````

Activer l'environnement Python :

````.\api_flask\Scripts\Activate.ps1````

Puis lancer Flask :

````python api_flask.py````

Le backend sera disponible à l'adresse indiquée par Flask, généralement :

````http://127.0.0.1:5000````

## Frontend

Dans un autre terminal :

````cd frontend````
````npm run dev````

Vite fournit généralement une adresse de type :

````http://localhost:5173````

Ouvrir cette adresse dans un navigateur pour utiliser PlantCheck.

# 🖥️ Utilisation

Une fois le frontend et le backend lancés :

Ouvrir l'application dans un navigateur à l'adresse fournie par Vite, généralement :

````http://localhost:5173````
1. Sélectionner une image de feuille depuis l'interface.
2. L'image est envoyée automatiquement au backend Flask.
3. Le modèle de Deep Learning analyse l'image.
4. L'application affiche les résultats de la prédiction :
  * 🌿 Plante identifiée
  * 🩺 Maladie détectée
  * 📊 Probabilité / score de confiance, si disponible

# 🛠️ Technologies utilisées
## Frontend
React
Vite
JavaScript
HTML
CSS

## Backend
Python
Flask
Flask-CORS
TensorFlow
Keras
NumPy
Pillow
