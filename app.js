var minute = 00;
var second = 00;
var milliSecond = 00;
var start_stop = document.getElementById('start_stop')
var clicked = false;
var saveHistory = [];


var getMinute = document.getElementById('minute')
var getSecond = document.getElementById('second')
var getMilliSecond = document.getElementById('milliSecond')


//input title
var getTitle = document.getElementById('title_field')
var history_div = document.getElementById('history_div');
var table = document.getElementById('hello')




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
    else if (second === 10) {
        minute++;
        getMinute.innerHTML = `${minute} :`
        second = "00";
        getSecond.innerHTML = second
    }
}


function start() {
    interval = setInterval(timer, 10)


}

function stop() {
    clearInterval(interval)

    saveHistory.push({ "title": getTitle.value, "minute": minute, "second": second, "milliSecond": milliSecond });
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
        var row = document.createElement('tr')
        row.setAttribute('id', 'history_row')


        var title = document.createElement('td');
        title.setAttribute('class', 'title')
        var titleText = document.createTextNode(saveHistory[i].title);
        title.appendChild(titleText)

        // time td
        var time = document.createElement('td')
        time.setAttribute('class', 'time')
        var timeText = document.createTextNode(`${saveHistory[i].minute} :${saveHistory[i].second} :${saveHistory[i].milliSecond}`)
        time.appendChild(timeText)

        // delete_btn 

        var delete_btn_td = document.createElement('td')
        var delete_btn = document.createElement('button')
        var delete_btn_text = document.createTextNode("Delete")
        delete_btn.appendChild(delete_btn_text);
        delete_btn_td.appendChild(delete_btn)

        delete_btn.setAttribute("onclick", "deleteHistory(this)")
        delete_btn.setAttribute("class", "delete_btn")




        row.appendChild(title)
        row.appendChild(time)
        row.appendChild(delete_btn_td)


        historyItems = row


        row.setAttribute('class', 'history_row')

    }
    table.appendChild(historyItems)

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
    saveHistory.splice(this, 1)
    e.parentNode.remove();
    if (saveHistory.length < 1) {
        history_div.innerHTML = ""
        table.innerHTML = ""
    }
}

function clearHistory() {
    saveHistory.length = []
    table.innerHTML = ""
    history_div.innerHTML = ""
}


function reset() {
    clearInterval(interval)

    milliSecond = "00";
    getMilliSecond.innerHTML = milliSecond;

    second = "00 :";
    getSecond.innerHTML = second;

    minute = "00 :";
    getMinute.innerHTML = minute

    clicked = false
    start_stop.innerHTML = "Start"

    getTitle.value = ""

}

