var daysEl = document.getElementById("days");
var hoursEl = document.getElementById("hours");
var minutesEl = document.getElementById("minutes");
var secondsEl = document.getElementById("seconds");
setInterval(function() {
    let dateFinal = new Date(2019, 11, 1, 19, 0, 0, 0);
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
}, 1000);
console.log(days);
console.log(hours);
console.log(minutes);
console.log(seconds);
console.log(dateFinal);