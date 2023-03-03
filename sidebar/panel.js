var js = document.createElement("script");
js.type = "text/javascript";
js.src = "../background.js";
document.body.appendChild(js);


var map = L.map('map').setView([2, 3], 13);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
		}).addTo(map);


function createMenuItem(engines) {
	console.log(engines)
  for (let engine of engines) {
    browser.menus.create({
      id: engine.name,
      title: engine.name,
      contexts: ["selection"]
    });
  }
}


browser.search.get().then(createMenuItem);		
browser.menus.onClicked.addListener((info, tab) => {
	
	console.log(info.selectionText);
	var str = "https://api.myptv.com/geocoding/v1/locations/by-text?searchText="+info.selectionText+"&apiKey=RVVfNzkzZWNlYjliYWU3NGY5Y2E2MGYyMjA2ODYxNDAxNzY6YTg1ZjFkMjYtMDk2MS00MDc2LWJmMzYtOWQ2NDM1NGE5OWFk"
	fetch(str)
	.then(result => result.json())
	.then(result => {
		console.log(result);
	  var coords = result["locations"][0]["referencePosition"];
	  var lat = coords.latitude;
	  var lng = coords.longitude;
	  console.log(lng);
	  console.log(lat);
	  map.setView([lat, lng], 10);
		
	});
	
  browser.search.search({
    query: info.selectionText,
    engine: info.menuItemId
  });
});
let myWindowId;
const contentBox = document.querySelector("#content");






window.addEventListener("mouseover", () => {
  contentBox.setAttribute("contenteditable", true);
});


window.addEventListener("mouseout", () => {
  contentBox.setAttribute("contenteditable", false);
  browser.tabs.query({windowId: myWindowId, active: true}).then((tabs) => {
    let contentToStore = {};
    contentToStore[tabs[0].url] = contentBox.textContent;
    browser.storage.local.set(contentToStore);
  });
});


function updateContent() {
  browser.tabs.query({windowId: myWindowId, active: true})
    .then((tabs) => {
      return browser.storage.local.get(tabs[0].url);
    })
    .then((storedInfo) => {
      contentBox.textContent = storedInfo[Object.keys(storedInfo)[0]];
    });
}



browser.windows.getCurrent({populate: true}).then((windowInfo) => {
  myWindowId = windowInfo.id;
  updateContent();
});
