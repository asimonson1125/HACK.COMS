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
