const api = typeof chrome !== "undefined" ? chrome : browser;

async function updateTrigger(tab=undefined){
    if (tab == undefined){
        tab = await browser.tabs.query({currentWindow: true, active: true});
        tab = tab[0];
    }
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

api.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received from content script:", message);
    // Do something with the message
    if (message.greeting === "triggerCharts") {
        triggerCharts();
    }
    else if (message.greeting === "Duration Set") {
        setTimer(message.data);
    }
    else if (message.greeting === "Stop Timer") {
        stopTimer(message.data);
    }
    else if (message.greeting === "Start Timer") {
        startTimer(message.data);
    }
});

api.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
    updateTrigger(tab);
    await api.scripting.executeScript({
        target: { tabId: tabId },
        files: ["/lib/chart.js"]
      });

    console.log("Injected chart.js into", tab);
});

async function triggerCharts(){
    tab = await browser.tabs.query({currentWindow: true, active: true});
    api.scripting.executeScript({
        target: { tabId: tab[0].id },
        func: (remaining, start) => {
            // Your code here, using `arg`
            console.log("Argument received:", remaining, start);
            document.__HACKATHON_remaining = parseInt(remaining);
            document.__HACKATHON_start = parseInt(start);

        },
        args: [localStorage.getItem('remaining'), localStorage.getItem('start')]  // Pass arguments as an array
    });
    api.scripting.executeScript({
        target: { tabId: tab[0].id },
        files: ["/videos_within_time_limit.js"]
    });
}
  
api.tabs.onActivated.addListener(async function(tabId) {
    updateTrigger(await api.tabs.get(tabId.tabId));
});

function setTimer(miliseconds){
    // const miliseconds = minutes * 60000;
    localStorage.setItem('duration', miliseconds);
    localStorage.setItem('remaining', miliseconds);
    localStorage.removeItem('start');
    updateTrigger();
    return `Timer set for ${minutes} minutes!`
}

function getDuration(){
    return localStorage.getItem('duration');
}

function startTimer(){
    localStorage.setItem('start', Date.now());
    setTimeout(alarm, getRemaining());
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

function alarm(){
    if (getRemaining() >= 0 && localStorage.getItem('start') > 1) {
        alert("Time's up, Jimbo!");
    }
    localStorage.removeItem('start');
    localStorage.setItem('remaining', 0)
}
