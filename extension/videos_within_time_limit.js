function getTimeFromAriaLabel(ariaLabel) {
    var match = ariaLabel.match(/(\d+) hours?/);
    var hours = match ? parseInt(match[1]) : 0;

    match = ariaLabel.match(/(\d+) minutes?/);
    var minutes = match ? parseInt(match[1]) : 0;

    match = ariaLabel.match(/(\d+) seconds?/);
    var seconds = match ? parseInt(match[1]) : 0;

    return (hours * 60 * 60) + (minutes * 60) + seconds;
}

function createNewPieChart(id, Time_limit, Video_length) {
    // Create a new canvas element
    let duration = document.getElementById(id + "newPieChart") ? 0 : 500;
    const newCanvas = document.createElement("canvas");
    newCanvas.id = id + "newPieChart";
    newCanvas.style.position = 'absolute';
    newCanvas.style.top = '0';
    newCanvas.style.left = '0';
    newCanvas.style.width = '75px';
    newCanvas.style.height = '75px';
    newCanvas.style.maxWidth = '75px';
    newCanvas.style.maxHeight = '75px';
    document.body.appendChild(newCanvas);
  
    // Get the new canvas element
    const newCtx = newCanvas.getContext("2d");
  
    // Define the new chart data
    const newData = {
      labels: ["Time_limit", "Video_length"],
      datasets: [{
        data: [(Video_length/Time_limit) * (100), 100 - (Video_length/Time_limit * (100))],
        backgroundColor: ["black", "white"],
        borderColor: ["white", "white"]
      }]
    };
  
    // Create the new chart
    const newChart = new Chart(newCtx, {
      type: "pie",
      data: newData,
      options: {
        responsive: false,
        plugins: {
            legend: {
              display: false  // Hide the legend
            }
          },
        title: {
          display: false,
          text: "New Pie Chart"
        },
        animation: {
            duration: duration  // Disable all animations
          }
      }
    });
  
    // Return the new canvas element
    return newCanvas;
}


if(document.location.host == "www.youtube.com"){
    const dismissibleElement = 0;
    const parentElement = 0;
    homepage = false;
    let arr = [];
    // Define the time limit in seconds

    let start = document.__HACKATHON_start;
    if (start < 1) start = 0;
    let ms = start > 1 ? document.__HACKATHON_remaining - (Date.now() - start) : document.__HACKATHON_remaining;

    let secs = ms / 1000;
    let time_limit = secs;
    let mins = Math.floor(secs / 60);
    let hrs = Math.floor(mins / 60);
    console.log(`${hrs}:${mins % 60}:${Math.floor(secs % 60)}`);
    console.log(secs);
    // let time_limit = 300;
    document.querySelectorAll('ytd-rich-grid-media').forEach((x) => {
        homepage = true;
        const thumbnailElement = x.querySelector('#thumbnail');
        const dismissibleElement = x.querySelector('#dismissible');
        const parentElement = dismissibleElement.parentNode;
        try {
            arr.push({
                title: x.querySelector('#video-title').textContent,
                time: x.querySelector('#time-status #text').ariaLabel,
                thumbnailElement: thumbnailElement
            });
        } catch(e) {
        }
    })
    document.querySelectorAll('ytd-compact-video-renderer').forEach((x) => {
        //debugger;
        const thumbnailElement = x;
        const dismissibleElement = x.querySelector('#dismissible');
        const parentElement = dismissibleElement.parentNode;
        try {
            arr.push({
                title: x.querySelector('#video-title').title,
                time: x.querySelector('badge-shape').ariaLabel,
                thumbnailElement: thumbnailElement
            });
        } catch(e) {
        }
    })
    document.querySelectorAll('ytd-video-renderer').forEach((x) => {
        const thumbnailElement = x.querySelector('#thumbnail');
        const dismissibleElement = x.querySelector('#dismissible');
        const parentElement = dismissibleElement.parentNode;
        try {
            arr.push({
                title: x.querySelector('#video-title').textContent,
                time: x.querySelector('#time-status #text').ariaLabel,
                thumbnailElement: thumbnailElement
            });
        } catch(e) {
        }
    })
    for (let i = 0; i < arr.length; i++) {
        // const parentElement = document.querySelector('#dismissible').parentElement;
        // debugger;
        videoTime = getTimeFromAriaLabel(arr[i].time);
        if (videoTime > time_limit) {
            // add a gray box to cover the thumbnail
            const gray_box = document.createElement('div');
            gray_box.style.position = 'absolute';
            gray_box.style.top = '0';
            gray_box.style.left = '0';
            gray_box.style.width = '100%';
            gray_box.style.height = '100%';
            gray_box.style.background = 'black';  //sfg
            gray_box.style.border = 'grey';  //sfg
            gray_box.style.borderBlockWidth = 4;  //sfg
            gray_box.style.zIndex = '1000'; // to ensure it covers the thumbnail
            gray_box.className = 'video-length-text';

            // add a text element on top of the gray box
            const text_element = document.createElement('div');
            text_element.style.position = 'absolute';
            text_element.style.top = '50%';
            text_element.style.left = '50%';
            text_element.style.transform = 'translate(-50%, -50%)';
            text_element.style.textAlign = 'center';
            text_element.style.color = 'white';
            text_element.style.fontSize = '16px';
            text_element.innerHTML = 'Video length too long<br>Length: ' + arr[i].time;
            text_element.style.zIndex = '1001'; // to ensure it's on top of the gray box
            text_element.className = 'video-length-text';
            arr[i].thumbnailElement.appendChild(gray_box);
            arr[i].thumbnailElement.appendChild(text_element);


            arr.splice(i, 1);
            i--; // decrement i since we removed an element
        } else {
            // remove the gray box and text element
            const existingGrayBox = arr[i].thumbnailElement.querySelectorAll('.video-length-text');
            const existingTextElement = arr[i].thumbnailElement.querySelectorAll('.video-length-text');
            existingGrayBox.forEach((x) => x.remove());
            existingTextElement.forEach((x) => x.remove());

            const newPieChart = createNewPieChart(arr[i].title, time_limit, videoTime);
            arr[i].thumbnailElement.appendChild(newPieChart);
        }
    }
    
    /*document.querySelectorAll('ytd-rich-item-renderer').forEach((x) => {
        console.log(x.querySelector('#video-title').textContent);
        console.log(x.querySelector('#time-status #text').ariaLabel);
    })*/
}
