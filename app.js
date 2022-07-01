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
    var history_div = document.getElementById('history_div');
    var table = document.getElementById('hello')

    saveHistory.push({ "minute": minute, "second": second, "milliSecond": milliSecond });
    if (saveHistory.length === 1) {
        var trHead = document.createElement('tr')
        var indexHeading = document.createElement('th')
        var timeHeading = document.createElement('th')
        var actionHeading = document.createElement('th')

        var indexHeadingText = document.createTextNode('Index')
        indexHeading.appendChild(indexHeadingText)


        var timeHeadingText = document.createTextNode('Time')
        timeHeading.appendChild(timeHeadingText)


        var actionHeadingText = document.createTextNode('Action')
        actionHeading.appendChild(actionHeadingText)

        trHead.appendChild(indexHeading)
        trHead.appendChild(timeHeading)
        trHead.appendChild(actionHeading)

        table.appendChild(trHead)
    }

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
        row.setAttribute('id', 'history_row')


        var index = document.createElement('td');
        var indexNum = document.createTextNode(i + 1);
        index.appendChild(indexNum)

        // time td
        var time = document.createElement('td')
        var timeText = document.createTextNode(`${saveHistory[i].minute} ${saveHistory[i].second} ${saveHistory[i].milliSecond}`)
        time.appendChild(timeText)

        // delete_btn 
        var delete_btn_td = document.createElement('td')
        var delete_btn = document.createElement('button')
        var delete_btn_text = document.createTextNode("Delete")
        delete_btn.appendChild(delete_btn_text);
        delete_btn_td.appendChild(delete_btn)
        delete_btn.setAttribute("onclick", "deleteHistory(this)")
        delete_btn.setAttribute("id", "delete_btn")

        // time.appendChild(dele)



        row.appendChild(index)
        row.appendChild(time)
        row.appendChild(delete_btn_td)


        historyItems = row
        // historyItems += hr


        row.setAttribute('class', 'history_row')

    }
    // var table = document.getElementById('hello')
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
    var saved_history = document.getElementById('hello');
    saved_history.innerHTML = ""
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

