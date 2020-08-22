var day = document.getElementById('day');
var month = document.getElementById('month');
var year = document.getElementById('year');
var weekday = document.getElementById('weekday');
var now = new Date();
var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octuber", "November", "December"];
var weekDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var liveTime = document.getElementById('livetime');

day.innerHTML = now.getDate();
var monthString = monthName[now.getMonth()];
month.innerHTML = monthString;
year.innerHTML = now.getFullYear();
var weekDayString = weekDayName[now.getDay()];
weekday.innerHTML = weekDayString;
liveTime.innerHTML = now.getHours() + " : " + now.getMinutes() + " : " + now.getSeconds();
function livetimefunc() {
    var now = new Date();
    liveTime.innerHTML = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    setTimeout(livetimefunc, 1000);
}
setInterval(livetimefunc(), 1000);

firebase.database().ref('todos').on('child_added', function (data) {
    var b = document.createElement('div');
    b.setAttribute("class", "record-box");
    b.setAttribute("id", "record-box");
    var c = document.createElement('h1');
    c.setAttribute("id", "task")
    var d = document.createElement('i');
    var e = document.createElement('i');
    var l = document.createElement('p');
    var m = document.createElement('p');
    l.setAttribute("id", "recordtime");
    m.setAttribute("id", "tasktime");
    l.innerHTML = "Record Time: " + data.val().todoaddtime;
    m.innerHTML = "Task Time: " + data.val().todotime;
    d.setAttribute("class", "fa fa-edit");
    e.setAttribute("class", "fa fa-trash");
    d.setAttribute("onclick", "editBtn(this)");
    d.setAttribute("id" , data.val().key)
    e.setAttribute("onclick", "deleteBtn(this)");
    e.setAttribute("id" , data.val().key)
    b.appendChild(c).innerHTML = data.val().todo;
    b.appendChild(e);
    b.appendChild(d);
    b.appendChild(l);
    b.appendChild(m);
    var f = document.getElementById('record-section');
    f.appendChild(b);
});


function addTodo() {
    var a = document.getElementById('inputtodo');
    var z = document.getElementById('inputtime');
    var database = firebase.database().ref('todos');
    var key = database.push().key;
    var todoobj = {
        key: key,
        todo: a.value,
        todotime: z.value,
        todoaddtime: liveTime.innerText
    }
    if (a.value == "") {
        alert('Please Enter Todo');
    } if (z.value == "") {
        alert('Please Enter Todo Time');
    } else {
        database.child(key).set(todoobj);
        a.value = "";
        z.value = "";
    }
}



function deleteAll(e) {
    firebase.database().ref('todos').remove();
    var a = document.getElementById('record-section');
    a.innerHTML = "";
}

function editBtn(e) {
    var editval = prompt("Enter Edit Value:" , e.previousSibling.previousSibling.innerText);
    var edittodo = {
        key: e.id,
        todo: editval,
        todotime: e.nextSibling.nextSibling.innerText,
        todoaddtime: e.nextSibling.innerText
    }
    firebase.database().ref('todos').child(e.id).set(edittodo);
    e.previousSibling.previousSibling.innerText = editval;
}

function deleteBtn(e) {
    firebase.database().ref('todos').child(e.id).remove();
    e.parentElement.remove();
}