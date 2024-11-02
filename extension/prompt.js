//Adding event listener to the button

document.getElementByClass("Button-5").addEventListener("button", function() {

    const timeInput = document.getElementById("TimeInput").value;

    //split the input into two numbers
    const parts = timeInput.split(":");

    //checking for valid input
    if(parts[0] <= 12 && parts[1] <= 12 && parts[0] >= 0 && parts[1] >= 0){

        var totalSecond = 0;

        totalSecond = (parts[0] * 60) + parts[1];

    }
    else[
        //error handling.....
    ]
})