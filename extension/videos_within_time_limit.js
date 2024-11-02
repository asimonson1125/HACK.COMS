function getTimeFromAriaLabel(ariaLabel) {
    var match = ariaLabel.match(/(\d+) hours?/);
    var hours = match ? parseInt(match[1]) : 0;

    match = ariaLabel.match(/(\d+) minutes?/);
    var minutes = match ? parseInt(match[1]) : 0;

    match = ariaLabel.match(/(\d+) seconds?/);
    var seconds = match ? parseInt(match[1]) : 0;

    return (hours * 60 * 60) + (minutes * 60) + seconds;
}

if(document.location.host == "www.youtube.com"){
    arr = []
    time_limit = 320
    document.querySelectorAll('ytd-rich-grid-media').forEach((x) => {
        try {
            arr.push("Title: " + x.querySelector('#video-title').textContent + " Time: " + x.querySelector('#time-status #text').ariaLabel);
        } catch(e) {
        }
    })
    document.querySelectorAll('ytd-compact-video-renderer').forEach((x) => {
        try {
            arr.push("Title: " + x.querySelector('#video-title').textContent + " Time: " + x.querySelector('#time-status #text').ariaLabel);
        } catch(e) {
        }
    })
    document.querySelectorAll('ytd-video-renderer').forEach((x) => {
        try {
            arr.push("Title: " + x.querySelector('#video-title').textContent + " Time: " + x.querySelector('#time-status #text').ariaLabel);
        } catch(e) {
        }
    })
    for(let i = 0; i < arr.length; i++) {
        var ariaLabel = arr[i].split("Time: ")[1];
        if(getTimeFromAriaLabel(ariaLabel) > time_limit) {
            arr.splice(i,1);
            i--; // decrement i since we removed an element
        }
    }
    console.log(arr);
    
    /*document.querySelectorAll('ytd-rich-item-renderer').forEach((x) => {
        console.log(x.querySelector('#video-title').textContent);
        console.log(x.querySelector('#time-status #text').ariaLabel);
    })*/
}