//HTML elements
var keyEl = document.getElementsByClassName("drumKey");
var pEl = document.getElementsByTagName("p");
var buttonEl = document.getElementById("power");
var volumeEl = document.getElementById("volume");
var sliderEl = document.getElementById("myRange");
//PLAY SOUND + BACKGROUND COLOR CHANGE ON KEY EVENT
var audio = new Audio("Sounds/do1.wav");
var audio1 = new Audio("Sounds/re.wav");
var audio2 = new Audio("Sounds/mi.wav");
var audio3 = new Audio("Sounds/fa.wav");
var audio4 = new Audio("Sounds/sol.wav");
var audio5 = new Audio("Sounds/la.wav");
var audio6 = new Audio("Sounds/si.mp3");
var audio7 = new Audio("Sounds/do2.wav");
var down = window.addEventListener("keydown", checkKeyPressed);
var up = window.addEventListener("keyup", checkKeyPressed)

function checkKeyPressed(e) {
    if (buttonEl.textContent.trim() == "ON") {
        switch (e.keyCode) {
            case 65:
                keyActions(e, audio, 0);
                break;
            case 83:
                keyActions(e, audio1, 1);
                break;
            case 68:
                keyActions(e, audio2, 2);
                break;
            case 70:
                keyActions(e, audio3, 3);
                break;
            case 71:
                keyActions(e, audio4, 4);
                break;
            case 72:
                keyActions(e, audio5, 5);
                break;
            case 74:
                keyActions(e, audio6, 6);
                break;
            case 75:
                keyActions(e, audio7, 7);
                break;
        }
    }
}

function keyActions(e, audio, i) {
    if (e.type === "keydown") {
        playSound(audio);
        swapToBlue(i);
    } else if (e.type === "keyup") {
        swapToGreen(i);
    }
}

function playSound(audioNumber) {
    audioNumber.volume = sliderEl.value * 0.01;
    audioNumber.play();
    audioNumber.currentTime = 0;
}

function swapToBlue(i) {
    keyEl[i].style.backgroundColor = "rgba(10, 03, 73, 0.4)";
}

function swapToGreen(i) {
    keyEl[i].style.backgroundColor = "rgba(0, 103, 73, 0.4)";
}
//BUTTON POWER BUTTON POWER BUTTON POWER BUTTON POWER BUTTON POWER BUTTON POWER BUTTON POWER 
buttonEl.addEventListener("click", turnOn);
window.addEventListener("keydown", checkEnterKey);
var greenButton = function() {
    buttonEl.style.backgroundColor = "rgba(0, 103, 73, 0.4)";
    buttonEl.style.color = "white";
    buttonEl.textContent = "ON";
}
var whiteButton = function() {
    buttonEl.style.backgroundColor = "rgba(255, 255, 255, 0.7)"
    buttonEl.style.color = "rgb(40, 84, 45)";
    buttonEl.textContent = "OFF";
};
//function called on event
function turnOn(e) {
    if (buttonEl.textContent.trim() == "OFF") {
        greenButton();
        for (i = 0; i < keyEl.length; i++) {
            swapToGreen(i);
            pEl[i].style.color = "white";
        }
    } else {
        whiteButton();
        for (i = 0; i < keyEl.length; i++) {
            keyEl[i].style.backgroundColor = "rgba(255, 255, 255, 0.7)";
            pEl[i].style.color = "#2d5b3c";
        }
    }
}

function checkEnterKey(e) {
    if (e.keyCode == 13) {
        turnOn();
    }
}
//VOLUME SLIDER VOLUME SLIDER VOLUME SLIDER VOLUME SLIDER VOLUME SLIDER VOLUME SLIDER 
sliderEl.addEventListener("input", volumeUpdate);

function volumeUpdate() {
    var val = sliderEl.value;
    volumeEl.innerHTML = "VOLUME " + val + "%";
}
//VISIBILITY HIDDEN
sliderEl.addEventListener("mousedown", showVolume);
sliderEl.addEventListener("mouseup", hideVolume);

function showVolume() {
    volumeEl.style.visibility = 'visible';
}

function hideVolume() {
    volumeEl.style.visibility = 'hidden';
}