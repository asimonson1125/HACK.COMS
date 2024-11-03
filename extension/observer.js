const api = typeof chrome !== "undefined" ? chrome : browser;

let = lastChange = Date.now();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(function() {
    // Check if we're on a YouTube page
    if (window.location.hostname.indexOf('youtube.com') !== -1) {
      setInterval(() => {api.runtime.sendMessage({ greeting: "triggerCharts", data: "trigger charts" })}, 1000)
      // Function to be triggered when new videos load
      async function onVideosLoaded() {
        // console.log('New videos loaded!');
        const myChange = Date.now();
        lastChange = myChange;
        await sleep(1000);
        // if (lastChange == myChange) api.runtime.sendMessage({ greeting: "triggerCharts", data: "trigger charts" });
      }
    let lastTriggerTime = 0;
    let queuedMutations = [];
    
    // MutationObserver to detect DOM changes
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (mutation.type === 'childList') {
            // Check if new video elements have been added
            if (mutation.addedNodes.length > 0) {
              onVideosLoaded();
            }
          }
        });
      });
  
      // Target the main content area of the YouTube page
      const targetNode = document.querySelector('body');
  
      // Start observing the target node for changes
      observer.observe(targetNode, { childList: true, subtree: true });
    }
  })();