var minute = 00;
var second = 00;
var milliSecond = 00;
var start_stop = document.getElementById('start_stop')
var clicked = false;
var stopHistory = [];


var getMinute = document.getElementById('minute')
var getSecond = document.getElementById('second')
var getMilliSecond = document.getElementById('milliSecond')



var interval = "";
function timer() {
    milliSecond++;
    getMilliSecond.innerHTML = milliSecond;
    if (milliSecond === 100) {
        second++;
        getSecond.innerHTML = second;
        milliSecond = "00";
        getMilliSecond.innerHTML = milliSecond
    }
    else if (second === 10) {
        minute++;
        getMinute.innerHTML = minute
        second = "00";
        getSecond.innerHTML = second
    }
}


function start() {
    interval = setInterval(timer, 10)
}

function stop() {
    clearInterval(interval)

    stopHistory.push({ "minute": minute, "second": second, "milliSecond": milliSecond });

    // var column1 = document.createElement('td')


    var historyItems = ""
    for (var i = 0; i < stopHistory.length; i++) {
        var row = document.createElement('tr')
        var column1 = document.createElement('td')
        var text = document.createTextNode(`${stopHistory[i].minute} ${stopHistory[i].second} ${stopHistory[i].milliSecond}`)
        column1.appendChild(text)
        row.appendChild(column1)
        historyItems = row

    }
    var a = document.getElementById('hello')
    a.appendChild(historyItems)

}


function toggle() {
    if (!clicked) {
        clicked = true
        start_stop.innerHTML = "Stop"
        start();
        return;
    }
    if (clicked) {
        clicked = false
        start_stop.innerHTML = "Start"
        stop();
        return;
    }

}

function testing() {
    alert("button chal rha ha")
}


function reset() {
    clearInterval(interval)

    milliSecond = "00";
    getMilliSecond.innerHTML = milliSecond;

    second = "00";
    getSecond.innerHTML = second;

    minute = "00";
    getMinute.innerHTML = minute

    clicked = false
    start_stop.innerHTML = "Start"

}

