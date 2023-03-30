var js = document.createElement("script");
js.type = "text/javascript";
js.src = "../background.js";
document.body.appendChild(js);


// Carte par défaut - Leaflet
var map = L.map('map').setView([40, 6], 7);

var tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
})
tile.addTo(map);


function createMenuItem(engines) {
  /*
  * Permet de voir apparaître l'extension lors d'un clic droit
  */
  browser.menus.create({
         id: "1",
         title: "Géolocaliser le mot",
         contexts: ["all"]
  });
}



// Ajout de l'extension dans la fenêtre au clic
browser.search.get().then(createMenuItem);	

// Action effectuée lors du clic sur l'application
browser.menus.onClicked.addListener((info, tab) => {
  console.log("ok");
	browser.sidebarAction.open();
  $( "#mot" ).html(info.selectionText);
	
  /* Partie 1 - Avec PTV */
	var str_PTV = "https://api.myptv.com/geocoding/v1/locations/by-text?searchText="+info.selectionText+"&apiKey=RVVfNzkzZWNlYjliYWU3NGY5Y2E2MGYyMjA2ODYxNDAxNzY6YTg1ZjFkMjYtMDk2MS00MDc2LWJmMzYtOWQ2NDM1NGE5OWFk"
	fetch(str_PTV)
	.then(result => result.json())
	.then(result => {
		console.log(result);
	  var coords = result["locations"][0]["referencePosition"];
	  var lat = coords.latitude;
	  var lng = coords.longitude;
	  $( "#coords" ).html("Lat "+Math.round(1000*lat)/1000+" | Lng "+Math.round(1000*lng)/1000);
	  map.setView([lat, lng], 9);
    
    // Nettoyage des marqueurs
    map.eachLayer((layer) => {
      console.log(layer);
      layer.remove();
      tile.addTo(map);
    });
    // Ajout du marqueur PTV
    var marker_PTV = L.circle([lat, lng], {
      title: "Géocodage PTV",
      color:'red',
      fillColor: 'red',
      fillOpacity: 0.2,
      radius: 20000
    });
    
    marker_PTV.addTo(map);
    /* Gestion des Boutons */

	});

});


/* Gestion des Boutons */

