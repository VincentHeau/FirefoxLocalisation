
// Action en arrière-plan
browser.menus.onClicked.addListener((info, tab) => {
    console.log("ok");
    browser.sidebarAction.open();
});