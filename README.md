# Extension de géolocalisation pour Firefox

Cette extension permet de géolocaliser des mots dans Firefox en utilisant des API de géolocalisations différentes (l'API de géolocalisation de Google Maps, chatgpt, et PTV

<img src="icons/icon.png" alt="logo" width="50">


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

### Google Maps

L'API de Google Maps est l'une des plus populaires pour la géolocalisation. Elle est connue pour sa précision et sa couverture mondiale. Cependant, l'utilisation de l'API est payante au-delà d'un certain nombre de requêtes par jour.

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

ChatGPT est un modèle de langage qui peut être utilisé pour répondre à des questions ou générer du texte en fonction d'une entrée. Il utilise l'apprentissage automatique pour comprendre le contexte de la question et fournir une réponse appropriée.

#### Forces
- ChatGPT est capable de répondre à une grande variété de questions, des plus simples aux plus complexes.
- Il peut être utilisé pour générer du texte, ce qui le rend utile dans des domaines tels que la génération automatique de résumés ou de descriptions de produits.
- Il est constamment mis à jour et amélioré grâce à l'apprentissage automatique.

#### Faiblesses
- Les réponses fournies par ChatGPT peuvent parfois manquer de précision ou être inexactes.
- Il nécessite une connexion à Internet pour fonctionner, ce qui peut être un inconvénient dans certains cas.

L'API ChatGPT peut être interrogée pour obtenir une réponse à une question en utilisant une requête HTTP POST. Voici un exemple de code pour appeler l'API en utilisant JavaScript :

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

PTV Group est une entreprise spécialisée dans la logistique et les transports, qui propose notamment des services de géocodage. Leurs solutions sont payantes et destinées aux professionnels.

#### Forces

- Précision élevée pour les adresses européennes.
- Possibilité de rechercher des adresses en utilisant des informations supplémentaires telles que le code postal, la ville, le pays, etc.
- Disponibilité d'informations de trafic en temps réel pour optimiser les itinéraires.

#### Faiblesses

- Solution payante.
- Couverture géographique limitée à l'Europe.
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
