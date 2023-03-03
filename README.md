# Extension de géolocalisation pour Firefox

Cette extension permet de géolocaliser des mots dans Firefox en utilisant l'API de géolocalisation de Google Maps.

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
  
  '''



## Auteur

Vincent HEAU

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
