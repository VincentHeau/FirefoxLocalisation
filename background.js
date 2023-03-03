

/*

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

*/

/*
Search using the search engine whose name matches the
menu item's ID.
*/



function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Item created successfully");
  }
}

browser.menus.create({
  id: "open-sidebar",
  title: browser.i18n.getMessage("menuItemOpenSidebar"),
  contexts: ["all"],
  command: "_execute_sidebar_action"
}, onCreated);


browser.menus.onClicked.addListener((info, tab) => {
	switch (info.menuItemId) {
    case "open-sidebar":
      console.log("Opening my sidebar");
      break;
    case "tools-menu":
      console.log("Clicked the tools menu item");
      break;
  }
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
	});
	
  browser.search.search({
    query: info.selectionText,
    engine: info.menuItemId
  });
});
