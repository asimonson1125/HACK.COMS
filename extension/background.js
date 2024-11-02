const api = typeof chrome !== "undefined" ? chrome : browser;

function updateTrigger(tab){
    const targetUrls = [
    "https://www.google.com",
    "https://www.youtube.com"
    ];
    debugger;
    if (targetUrls.some(turl => tab.url.startsWith(turl))) {
        api.action.setIcon({path: "/img/clock.png"});
    } else {
        api.action.setIcon({path: "/img/icon.png"});
    }
        
}

api.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
    updateTrigger(tab);
});
  
api.tabs.onActivated.addListener(async function(tabId) {
    updateTrigger(await api.tabs.get(tabId.tabId));
});
  
// updateTrigger();
