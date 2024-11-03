const api = typeof chrome !== "undefined" ? chrome : browser;
let duration = 0;

document.querySelector(".timer__btn--start").addEventListener("click", function(){

    let hour = parseInt(document.getElementById("hourInput").value, 10);
    
    let minute = parseInt(document.getElementById("minuteInput").value, 10);

    let second = parseInt(document.getElementById("secondInput").value, 10);

    hour = hour ? hour : 0;
    minute = minute ? minute : 0;
    second = second ? second : 0;

    duration = ((hour * 3600) + (minute * 60) + second) * 1000;
    api.runtime.sendMessage({ greeting: "Duration Set", data: duration });

})

function resetTime(){
    document.querySelector(".timer__btn--reset").addEventListener("click", function(){
        document.getElementById("hourInput").value = "";
        document.getElementById("minuteInput").value = "";
        document.getElementById("secondInput").value = "";

        api.runtime.sendMessage({ greeting: "Stop Timer", data: ""})
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
    document.querySelector('#remainder .countdown').textContent = `${hrs}:${mins % 60}:${Math.floor(secs % 60)}`;
}

resetTime();
setInterval(updateTime, 250);
updateTime();