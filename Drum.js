//Instead of targeting the html we can target directly from JS like this:
/*document.getElementById("mybutton").onclick = function(event) { ...
}*/
var keyEl = document.getElementsByClassName("drumKey");
var pEl = document.getElementsByTagName("p");
var buttonEl = document.getElementById("power");
//BACKGROUND COLOR CHANGE ONCLICK
for (i = 0; i < keyEl.length; i++) {
    keyEl[i].addEventListener("click", colorChange(i));
}
//I don't understand why we are returning a value and why we dont need to return it if we don't pass an argument
function colorChange(i) {
    return function() {
        swapColors(i);
    }
}
//BACKGROUND COLOR CHANGE + SOUND ONKEYDOWN
var keyPressed = window.addEventListener("keydown", checkKeyPressed);
//Intentar crear un objeto en lugar de 8 variables
var audio = new Audio("Sounds/adrian1.mp3");
var audio1 = new Audio("Sounds/casti1.mp3");
var audio2 = new Audio("Sounds/jorge1.mp3");
var audio3 = new Audio("Sounds/joel1.mp3");
var audio4 = new Audio("Sounds/adrian2.mp3");
var audio5 = new Audio("Sounds/casti2.mp3");
var audio6 = new Audio("Sounds/jorge2.mp3");
var audio7 = new Audio("Sounds/joel2.mp3");

function checkKeyPressed(e) {
    switch (e.keyCode) {
        case 65:
            audio.volume = 1;
            audio.play();
            audio.currentTime = 0;
            swapColors(0);
            break;
        case 83:
            audio1.play();
            audio1.currentTime = 0;
            swapColors(1);
            break;
        case 68:
            audio2.play();
            audio2.currentTime = 0;
            swapColors(2);
            break;
        case 70:
            audio3.play();
            audio3.currentTime = 0;
            swapColors(3);
            break;
        case 71:
            audio4.play();
            audio4.currentTime = 0;
            swapColors(4);
            break;
        case 72:
            audio5.play();
            audio5.currentTime = 0;
            swapColors(5);
            break;
        case 74:
            audio6.play();
            audio6.currentTime = 0;
            swapColors(6);
            break;
        case 75:
            audio7.play();
            audio7.currentTime = 0;
            swapColors(7);
            break;
    }
}

function swapColors(i) {
    if (pEl[i].style.color == "white") {
        keyEl[i].style.backgroundColor = "rgba(255, 255, 255, 0.7)";
        pEl[i].style.color = "#2d5b3c";
    } else {
        keyEl[i].style.backgroundColor = "rgba(0, 103, 73, 0.4)";
        pEl[i].style.color = "white"
    }
}
//Button POWER
buttonEl.addEventListener("click", turnOff);

function turnOff(e) {
    if (buttonEl.textContent == "OFF") {
        buttonEl.style.backgroundColor = "rgba(0, 103, 73, 0.4)";
        buttonEl.style.color = "white";
        buttonEl.textContent = "ON";
    } else {
        buttonEl.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
        buttonEl.style.color = "rgb(40, 84, 45)";
        buttonEl.textContent = "OFF";
    }
}