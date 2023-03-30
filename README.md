# Extension de géolocalisation pour Firefox

Cette extension permet de géolocaliser des mots dans Firefox en utilisant l'API gratuite de géolocalisation proposée par l'entreprise PTV.
Ce tutoriel présente comment installer l'application ainsi que les codes qui permettent d'utiliser les API de géocodage payantes proposées par Google Maps, ou encore ChatGPT.
<p align="center">
  <img src="iconv1.svg" width="200" height="200" alt="Iconv1 Logo">
</p>

> ℹ️ Remarque : Une description détaillée du code et du fonctionnement figurent dans le [Rapport.md](./Rapport.md). Pour l'installation, se référer au paragraphe correspondant, ou suivre la vidéo d'installation.

## Table des matières

- [Installation](#installation)
- [Utilisation](#utilisation)
- [Géolocalisation](#géolocalisation)
  - [Google Maps API](#google-maps-api)
  - [API ChatGPT](#api-chatgpt)
  - [PTV Group API](#ptv-group-api)
- [Auteur](#auteur)
- [Licence](#licence)

## Installation

1. Télécharger l'extension en cliquant sur le bouton "Télécharger l'extension" ci-dessus.
2. Ouvrir Firefox et accéder au menu des modules complémentaires.
3. Cliquer sur l'icône d'engrenage (Paramètres) en haut à droite et sélectionner "Installer un module depuis un fichier".
4. Sélectionner le fichier téléchargé dans l'étape 1.
5. Redémarrer Firefox.

## Utilisation

1. Sélectionner un mot dans une page web.
2. Clic droit sur le mot sélectionné et sélectionner "Géolocaliser le mot" dans le menu.
3. Une nouvelle fenêtre s'ouvrira affichant la carte Google Maps avec l'emplacement du mot géolocalisé.

## Géolocalisation

Cette extension utilise trois modes de géolocalisation différents pour obtenir la localisation d'un mot : l'API de Google Maps, l'API de ChatGPT et l'API de PTV Group.


### IGN


```javascript
const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.features.length > 0) {
      // Récupérer les coordonnées géographiques
      const latitude = data.features[0].geometry.coordinates[1];
      const longitude = data.features[0].geometry.coordinates[0];
      console.log(`Latitude : ${latitude} | Longitude : ${longitude}`);
    } else {
      console.log("Adresse introuvable");
    }
  })
  .catch(error => console.error(error));

```

### Google Maps

L'API de Google Maps est l'une des plus populaires pour la géolocalisation. Elle est connue pour sa précision et sa couverture mondiale. Cependant, l'utilisation de l'API est payante au-delà d'un certain nombre de requêtes par jour. Elle nécessite un compte de facturation, et n'a donc pas été mise en place dans le projet. Cependant, les quelques lignes ci-dessous détaillent comment utiliser ce service une fois que l'on a obtenu la clé d'API.

Pour utiliser l'API de Google Maps, il faut d'abord créer une clé API et l'insérer dans le code JavaScript de l'extension. Voici un exemple d'appel à l'API :

```javascript
fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${word}&key=YOUR_API_KEY`)
  .then(response => response.json())
  .then(data => {
    const location = data.results[0].geometry.location;
    // Faire quelque chose avec la localisation
  })
  .catch(error => console.error(error));
  
  ```
  
  
### ChatGPT

ChatGPT est un modèle de langage qui peut être utilisé pour répondre à des questions ou générer du texte en fonction d'une entrée. Il utilise l'apprentissage automatique pour comprendre le contexte de la question et fournir une réponse appropriée. On peut donc l'utiliser pour demander des coordonnées géographiques d'un lieu et traiter ensuite la réponse obtenue pour afficher le marqueur sur la carte.


L'API ChatGPT peut être interrogée pour obtenir une réponse à une question en utilisant une requête HTTP POST. Voici un exemple de code pour appeler l'API en utilisant JavaScript :
Il est nécessaire de payer pour avoir accès à une clé d'API. Elle est proposée à 0.002$ pour 1000 tokens.

```javascript
async function getChatGPTAnswer(question) {
  const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer <API_KEY>"
    },
    body: JSON.stringify({
      prompt: `Answer the following question: ${question}`,
      max_tokens: 1024,
      n: 1,
      stop: "\n"
    })
  });

  const data = await response.json();

  return data.choices[0].text.trim();
}

// Utilisation de la fonction pour obtenir une réponse à une question
const question = "Quelle est la hauteur de la tour Eiffel ?";
const answer = await getChatGPTAnswer(question);
console.log(answer); // "La tour Eiffel mesure 324 mètres de hauteur."

```

### PTV Group

PTV Group est une entreprise spécialisée dans la logistique et les transports, qui propose notamment des services de géocodage.

#### Forces

- Précision élevée pour les adresses européennes.
- Possibilité de rechercher des adresses en utilisant des informations supplémentaires telles que le code postal, la ville, le pays, etc.
- Disponibilité d'informations de trafic en temps réel pour optimiser les itinéraires.
- Possibilité d'utiliser l'API gratuite pour un nombre limité de requêtes.

#### Faiblesses

- Les adresses hors d'Europe peuvent être moins précises.

#### Exemple d'appel à l'API

Pour utiliser l'API de géocodage de PTV Group, vous devez d'abord vous inscrire sur leur site Web pour obtenir une clé API. Voici un exemple de code JavaScript pour effectuer une recherche de géocodage avec PTV Group :

```javascript
const api_key = 'INSERT_YOUR_API_KEY_HERE';
const query = '5 rue de Rivoli, Paris, France';

fetch(`https://api.ptvgroup.com/geocoding/v1/address?q=${encodeURIComponent(query)}&limit=1&apikey=${api_key}`)
  .then(response => response.json())
  .then(data => {
    const location = data.results[0].location;
    console.log(`Latitude: ${location.latitude}, Longitude: ${location.longitude}`);
  })
  .catch(error => console.error(error));
  ```



## Auteur

Vincent HEAU

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
