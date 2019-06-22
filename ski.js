var daysEl = document.getElementById("days");
var hoursEl = document.getElementById("hours");
var minutesEl = document.getElementById("minutes");
var secondsEl = document.getElementById("seconds");
var audio = new Audio('audio/yeu.mp3');
audio.play();
setInterval(function() {
    let dateFinal = new Date(2019, 7, 3, 0, 0, 0, 0); /*El mes a indicar es 1 mes anterior a la fecha final. Si queremos Agosto indicamos 7 BUG a resolver*/
    if (new Date() > dateFinal) {
        console.log("hola")
        countDownOver(daysEl, 0);
        countDownOver(hoursEl, 0);
        countDownOver(minutesEl, 0);
        countDownOver(secondsEl, 0);
    } else {
        console.log(dateFinal);
        let dateNow = new Date();
        let diffMilliS = dateFinal - dateNow;
        let days = Math.floor(diffMilliS / 1000 / 60 / 60 / 24);
        let daysRemainderMilis = Math.floor((diffMilliS) % (1000 * 60 * 60 * 24));
        let hours = Math.floor((daysRemainderMilis / 1000 / 60 / 60));
        let hoursRemainderMilis = Math.floor((daysRemainderMilis) % (1000 * 60 * 60));
        let minutes = Math.floor((hoursRemainderMilis / 1000 / 60));
        let minutesRemainderMilis = Math.floor((hoursRemainderMilis) % (1000 * 60));
        let seconds = Math.floor((minutesRemainderMilis / 1000));
        twoDigits(daysEl, days);
        twoDigits(hoursEl, hours);
        twoDigits(minutesEl, minutes);
        twoDigits(secondsEl, seconds);

        function twoDigits(timeEl, time) {
            if (time < 10) {
                timeEl.innerHTML = "0" + time;
            } else {
                timeEl.innerHTML = time;
            }
        }
    }
}, 1000);

function countDownOver(timeEl, time) {
    timeEl.innerHTML = 0 + time;
}
console.log(days);
console.log(hours);
console.log(minutes);
console.log(seconds);