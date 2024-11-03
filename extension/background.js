const api = typeof chrome !== "undefined" ? chrome : browser;

function updateTrigger(tab){
    const targetUrls = [
    "https://www.google.com",
    "https://www.youtube.com"
    ];
    if (targetUrls.some(turl => tab.url.startsWith(turl))) {
        api.action.setIcon({path: "/img/clock.png"});
        startTimer();
    } else {
        api.action.setIcon({path: "/img/icon.png"});
        stopTimer();
    }
        
}

api.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
    updateTrigger(tab);
});
  
api.tabs.onActivated.addListener(async function(tabId) {
    updateTrigger(await api.tabs.get(tabId.tabId));
});

function setTimer(minutes){
    const miliseconds = minutes * 60000;
    localStorage.setItem('duration', miliseconds);
    localStorage.setItem('remaining', miliseconds);
    return `Timer set for ${minutes} minutes!`
}

function getDuration(){
    return localStorage.getItem('duration');
}

function startTimer(){
    localStorage.setItem('start', Date.now());
}

function stopTimer(){
    const start = localStorage.getItem('start');
    if (start < 1) throw new Error("yikes");
    const elapsed = (Date.now() - start);
    localStorage.removeItem('start');
    const timeRemaining = getRemaining() - elapsed;
    localStorage.setItem('remaining', timeRemaining);
    console.log(elapsed/1000 + " seconds elapsed")
    return timeRemaining;
}

function getRemaining(){
    const storedRemaining = localStorage.getItem('remaining');
    const start = localStorage.getItem('start');
    if (start < 1) return storedRemaining;
    const elapsed = (Date.now() - start);
    return storedRemaining - elapsed;
}
