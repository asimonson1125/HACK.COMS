
var totalSeconds = 0;

document.querySelector(".timer__btn--start").addEventListener("click", function(){

    var hour = parseInt(document.getElementById("hourInput").value, 10);
    

    var minute = parseInt(document.getElementById("minuteInput").value, 10);

    var second = parseInt(document.getElementById("secondInput").value, 10);

    totalSeconds = (hour * 3600) + (minute * 60) + second;

})

function resetTime(){
    document.querySelector(".timer__btn--reset").addEventListener("click", function(){


        // console.log("test");
        totalSeconds = 0;

        document.getElementById("hourInput").value = "";
        document.getElementById("minuteInput").value = "";
        document.getElementById("secondInput").value = "";

        document.querySelector(".countdown").textContent = "__:__";

    })
}
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

resetTime();
setInterval(updateTime, 250);
updateTime();