var row = null;
window.onload = function() {
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var data = JSON.parse(localStorage.getItem(key));
        addRow(key, data.F_name, data.L_name);
    }
}

function Submit() {
    if (row == null) {
        retriveData();
    } else {
        update();
    }
}

function retriveData() {
    var name1 = document.getElementById("fname").value;
    var name2 = document.getElementById("lname").value;
    var data = {
        F_name: name1,
        L_name: name2
    }
    var json_data = JSON.stringify(data);
    localStorage.setItem(name1, json_data);

    addRow(name1, name1, name2);

    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
}

function addRow(key, name1, name2) {
    var tab = document.getElementById("tab");
    var row = tab.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = name1;
    cell2.innerHTML = name2;
    cell3.innerHTML = `<button onclick=edit(this)>Edit</button>
    <button onclick=remove(this,'${key}')>Delete</button> `;
}

function edit(td) {
    row = td.parentElement.parentElement;
    var name1 = row.cells[0].innerHTML;
    var name2 = row.cells[1].innerHTML;
    document.getElementById("fname").value = name1;
    document.getElementById("lname").value = name2;
}
function update() {
    var name1 = row.cells[0].innerHTML;
    var name2 = row.cells[1].innerHTML;
    var newData = {
        F_name: document.getElementById("fname").value,
        L_name: document.getElementById("lname").value
    }
    localStorage.setItem(name1, JSON.stringify(newData));
    row.cells[0].innerHTML = newData.F_name;
    row.cells[1].innerHTML = newData.L_name;

    row = null;
}


function remove(td, key) {
    if (confirm("Are you sure you want to delete this?")) {
        var row = td.parentElement.parentElement;
        localStorage.removeItem(key);
        document.getElementById("tab").deleteRow(row.rowIndex);
    }
}
