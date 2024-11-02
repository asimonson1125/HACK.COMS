if(document.location.host == "www.youtube.com"){
    document.querySelectorAll('ytd-rich-grid-media').forEach((x) => {
        console.log(x.querySelector('#video-title').textContent);
        console.log(x.querySelector('#time-status #text').ariaLabel);
    })
}