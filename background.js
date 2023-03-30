
// Action en arrière-plan
browser.menus.onClicked.addListener((info, tab) => {
    
    // Stocker le texte sélectionné que nous voulons passer en paramètre
    var myData = {
        selection: info.selectionText
    };

    browser.storage.local.set({myData: myData});
    
    // Ouvrir la sidebar et passer les données en paramètre
    browser.sidebarAction.open().then(() => {
        // Récupérer les données stockées et les envoyer à la sidebar
        var gettingData = browser.storage.local.get("myData");
        gettingData.then((result) => {
        var myData = result.myData;
        browser.sidebarAction.setPanel({panel: "sidebar/panel.html?data=" + encodeURIComponent(JSON.stringify(myData))});
        });
    });
    
});

