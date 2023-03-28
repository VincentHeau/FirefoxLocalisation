var js = document.createElement("script");
js.type = "text/javascript";
js.src = "../background.js";
document.body.appendChild(js);


// Carte par défaut - Leaflet
var map = L.map('map').setView([40, 6], 7);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);


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
	var str = "https://api.myptv.com/geocoding/v1/locations/by-text?searchText="+info.selectionText+"&apiKey=RVVfNzkzZWNlYjliYWU3NGY5Y2E2MGYyMjA2ODYxNDAxNzY6YTg1ZjFkMjYtMDk2MS00MDc2LWJmMzYtOWQ2NDM1NGE5OWFk"
	fetch(str)
	.then(result => result.json())
	.then(result => {
		console.log(result);
	  var coords = result["locations"][0]["referencePosition"];
	  var lat = coords.latitude;
	  var lng = coords.longitude;
	  $( "#coords" ).html("Latitude "+lat+"  |  Longitude "+lng);
	  map.setView([lat, lng], 10);

    // Ajout du marqueur PTV
    var marker_PTV = L.marker([lat, lng], {
      icon: greenIcon,
      title: "Géocodage PTV"
    });
    marker_PTV.addTo(map);

	});

  /* Partie 2 - Avec PTV */
	
});


// let myWindowId;
// const contentBox = document.querySelector("#content");



// window.addEventListener("mouseover", () => {
//   contentBox.setAttribute("contenteditable", true);
// });


// window.addEventListener("mouseout", () => {
//   contentBox.setAttribute("contenteditable", false);
//   browser.tabs.query({windowId: myWindowId, active: true}).then((tabs) => {
//     let contentToStore = {};
//     contentToStore[tabs[0].url] = contentBox.textContent;
//     browser.storage.local.set(contentToStore);
//   });
// });


// function updateContent() {
//   browser.tabs.query({windowId: myWindowId, active: true})
//     .then((tabs) => {
//       return browser.storage.local.get(tabs[0].url);
//     })
//     .then((storedInfo) => {
//       contentBox.textContent = storedInfo[Object.keys(storedInfo)[0]];
//     });
// }


// browser.windows.getCurrent({populate: true}).then((windowInfo) => {
//   myWindowId = windowInfo.id;
//   updateContent();
// });
