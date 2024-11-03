
var totalSeconds = 0;

document.querySelector(".timer__btn--start").addEventListener("click", function(){

    var hour = parseInt(document.getElementById("hourInput").value, 10);
    

    var minute = parseInt(document.getElementById("minuteInput").value, 10);

    var second = parseInt(document.getElementById("secondInput").value, 10);

    totalSeconds = (hour * 3600) + (minute * 60) + second;

})

