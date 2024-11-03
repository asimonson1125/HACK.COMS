const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
document.head.appendChild(script);

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
        }
      }
    });
  
    // Return the new canvas element
    return newCanvas;
}
script.onload = () => {
if(document.location.host == "www.youtube.com"){
    let arr = [];
    let time_limit = 1800;
    document.querySelectorAll('ytd-rich-grid-media').forEach((x) => {
        const id = x.querySelector('#video-title-link')
        const thumbnailElement = x.querySelector('#thumbnail');
        const dismissibleElement = x.querySelector('#dismissible');
        try {
            arr.push({
                id: id.href,
                title: x.querySelector('#video-title').textContent,
                time: x.querySelector('#time-status #text').ariaLabel,
                thumbnailElement: thumbnailElement
            });
        } catch(e) {
        }
    })
    document.querySelectorAll('ytd-compact-video-renderer').forEach((x) => {
        const id = x.querySelector('#video-title-link')
        const thumbnailElement = x.querySelector('#thumbnail');
        const dismissibleElement = x.querySelector('#dismissible');
        try {
            arr.push({
                id: id.href,
                title: x.querySelector('#video-title').textContent,
                time: x.querySelector('#time-status #text').ariaLabel,
                thumbnailElement: thumbnailElement
            });
        } catch(e) {
        }
    })
    document.querySelectorAll('ytd-video-renderer').forEach((x) => {
        const id = x.querySelector('#video-title-link')
        const thumbnailElement = x.querySelector('#thumbnail');
        const dismissibleElement = x.querySelector('#dismissible');
        try {
            arr.push({
                id: id.href,
                title: x.querySelector('#video-title').textContent,
                time: x.querySelector('#time-status #text').ariaLabel,
                thumbnailElement: thumbnailElement
            });
        } catch(e) {
        }
    })
    for (let i = 0; i < arr.length; i++) {
        videoTime = getTimeFromAriaLabel(arr[i].time);
        if (videoTime > time_limit) {
            arr.splice(i, 1);
            i--; // decrement i since we removed an element
        } else {
            const newPieChart = createNewPieChart(arr[i].id, time_limit, videoTime);
            arr[i].thumbnailElement.appendChild(newPieChart);
        }
    }
    
    /*document.querySelectorAll('ytd-rich-item-renderer').forEach((x) => {
        console.log(x.querySelector('#video-title').textContent);
        console.log(x.querySelector('#time-status #text').ariaLabel);
    })*/
}}