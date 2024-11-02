//Adding event listener to the button

document.getElementByClass("Button-5").addEventListener("button", function() {

    const timeInput = document.getElementById("TimeInput").value;

    //split the input into two numbers
    const parts = timeInput.split(":");

    min = parseInt(parts[0], 10);
    second = parseInt(parts[1], 10);
    //checking for valid input
    if(min <= 12 && second <= 12 && min >= 0 && second >= 0){

        var totalSecond = 0;

        totalSecond = (min * 60) + second;

    }
    else[
        //error handling.....
    ]
})