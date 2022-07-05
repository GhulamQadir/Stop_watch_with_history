var minute = 00;
var second = 00;
var milliSecond = 00;
var start_stop = document.getElementById('start_stop')
var clicked = false;
var saveHistory = [];


// getting minutes, seconds amd milliseconds
var getMinute = document.getElementById('minute')
var getSecond = document.getElementById('second')
var getMilliSecond = document.getElementById('milliSecond')


// input field value(title)
var getTitle = document.getElementById('title_field')

// history div
var history_div = document.getElementById('history_div');

// history table
var historyTable = document.getElementById('history_table')




var interval = "";
function timer() {
    milliSecond++;
    getMilliSecond.innerHTML = milliSecond;
    if (milliSecond === 100) {
        second++;
        getSecond.innerHTML = `${second} :`;
        milliSecond = "00";

        getMilliSecond.innerHTML = milliSecond
    }
    else if (second === 60) {
        minute++;
        getMinute.innerHTML = `${minute} :`
        second = "00";
        getSecond.innerHTML = second
    }

    if (milliSecond < 10) {
        getMilliSecond.innerHTML = `0${milliSecond}`
    }
    else if (second < 10) {
        getSecond.innerHTML = `0${second} :`
    }
    else if (minute < 10) {
        getMinute.innerHTML = `0${minute} :`
    }
}


function start() {
    interval = setInterval(timer, 10)


}

function stop() {
    clearInterval(interval)

    saveHistory.push({ "title": getTitle.value, "minute": getMinute.innerHTML, "second": getSecond.innerHTML, "milliSecond": getMilliSecond.innerHTML });
    console.log(saveHistory)

    if (saveHistory.length === 1) {
        var historyHeading = document.createElement('p');
        var historyHeading_text = document.createTextNode('History')
        historyHeading.setAttribute('class', 'history_heading')
        historyHeading.appendChild(historyHeading_text);
        history_div.appendChild(historyHeading)
    }


    if (saveHistory.length === 2) {
        var clear_all_btn = document.createElement('button');
        var clear_all_text = document.createTextNode('Clear history')
        clear_all_btn.setAttribute('onclick', 'clearHistory()')
        clear_all_btn.setAttribute('class', 'clearHistory')
        clear_all_btn.appendChild(clear_all_text)
        history_div.appendChild(clear_all_btn)
    }


    var historyItems = ""
    for (var i = 0; i < saveHistory.length; i++) {
        var tableRow = document.createElement('tr')
        tableRow.setAttribute('id', 'history_row')


        var title = document.createElement('td');
        title.setAttribute('class', 'title')
        var titleText = document.createTextNode(saveHistory[i].title);
        title.appendChild(titleText)

        // time td
        var time = document.createElement('td')
        time.setAttribute('class', 'time')
        var timeText = document.createTextNode(`${saveHistory[i].minute}${saveHistory[i].second}${saveHistory[i].milliSecond}`)
        time.appendChild(timeText)


        // delete_btn td 
        var delete_btn_td = document.createElement('td')
        var delete_btn = document.createElement('button')
        var delete_btn_text = document.createTextNode("Delete")
        delete_btn.appendChild(delete_btn_text);
        delete_btn_td.appendChild(delete_btn)

        delete_btn.setAttribute("onclick", "deleteHistory(this)")
        delete_btn.setAttribute("class", "delete_btn")




        tableRow.appendChild(title)
        tableRow.appendChild(time)
        tableRow.appendChild(delete_btn_td)

        historyItems = tableRow

    }
    historyTable.appendChild(historyItems)

}


function toggle() {
    if (getTitle.value === "") {
        alert("Please write title")
    }

    if (!clicked
        && getTitle.value.length != ""
    ) {
        clicked = true
        start_stop.setAttribute('class', 'toggle')
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
    e.parentNode.parentNode.remove();
    saveHistory.splice(this, 1)

    if (saveHistory.length < 1) {
        history_div.innerHTML = ""
        historyTable.innerHTML = ""
    }
    console.log(saveHistory)
}

function clearHistory() {
    saveHistory.length = []
    historyTable.innerHTML = ""
    history_div.innerHTML = ""
}


function reset() {
    clearInterval(interval)

    milliSecond = 00;
    second = 00;
    minute = 00;

    getMilliSecond.innerHTML = "00";

    getSecond.innerHTML = "00 :";

    getMinute.innerHTML = "00 :";

    clicked = false
    start_stop.innerHTML = "Start"

    getTitle.value = ""

}

