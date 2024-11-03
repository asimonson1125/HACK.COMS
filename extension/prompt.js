//Adding event listener to the button


var totalSecond = 0;
document.querySelector(".button-5").addEventListener("click", function() {


    const hrInput = document.getElementById("hourInput").value;
    const minInput = document.getElementById("minuteInput").value;
    const secInput = document.getElementById("secondsInput").value;




    var hr = parseInt(hrInput, 10);
    var min = parseInt(minInput, 10);
    var sec = parseInt(secInput, 10);


   totalSecond = (hr * 3600) + (min * 60) + sec;
//    document.querySelector('h1').textContent = totalSecond;


}
)

function updateTime(){
    localStorage.getItem('duration');
    let start = localStorage.getItem('start');
    if (start < 1) start = 0;
    let ms = start > 1 ? localStorage.getItem('remaining') - (Date.now() - start) : localStorage.getItem('remaining');

    let secs = ms / 1000;
    let mins = Math.floor(secs / 60);
    let hrs = Math.floor(mins / 60);
    document.querySelector('#remainder .countdown').textContent = `${hrs}:${mins % 60}:${math.floor(secs % 60)}`;
}

setInterval(updateTime, 250);
updateTime();
