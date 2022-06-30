var minute = 00;
var second = 00;
var milliSecond = 00;
var start_stop = document.getElementById('start_stop')
var clicked = false;
var saveHistory = [];


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
    else if (second === 60) {
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

    saveHistory.push({ "minute": minute, "second": second, "milliSecond": milliSecond });

    var history_div = document.getElementById('history_div');
    if (saveHistory.length === 2) {
        var clear_all_btn = document.createElement('button');
        var clear_all_text = document.createTextNode('Clear history')
        clear_all_btn.setAttribute('onclick', 'clearHistory()')
        clear_all_btn.appendChild(clear_all_text)
        history_div.appendChild(clear_all_btn)
    }


    var historyItems = ""
    for (var i = 0; i < saveHistory.length; i++) {
        var row = document.createElement('tr')

        // time td
        var time = document.createElement('td')
        var text = document.createTextNode(`${saveHistory[i].minute} ${saveHistory[i].second} ${saveHistory[i].milliSecond}`)
        time.appendChild(text)

        // delete_btn td
        var delete_btn = document.createElement('button')
        var text = document.createTextNode("Delete")
        delete_btn.appendChild(text);
        delete_btn.setAttribute("onclick", "deleteHistory(this)")

        row.appendChild(time)
        row.appendChild(delete_btn)
        historyItems = row

    }
    var table = document.getElementById('hello')
    table.appendChild(historyItems)

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

function deleteHistory(e) {
    e.parentNode.remove();
}

function clearHistory() {
    saveHistory.length = []
    // var history_div = document.getElementById('history_div')
    // var a = document.createElement('tr');
    // history_div.appendChild(a)
    console.log(saveHistory)
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

