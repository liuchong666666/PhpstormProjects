function $(id) {
    return document.getElementById(id);
}

function initial() {
    //获取元素
    btnSave = $("btnSave");
    btnShow = $("btnShow");
    btnRemove = $("btnRemove");
    btnClear = $("btnClear");
    //绑定事件
    btnSave.addEventListener("click", btnSave_click, false);
    btnShow.addEventListener("click", btnShow_click, false);
    btnRemove.addEventListener("click", btnRemove_click, false);
    btnClear.addEventListener("click", btnClear_click, false);

}

/**
 * 移除所有数据
 * */
function btnClear_click() {
    sessionStorage.clear();
    alert("移除所有成功");
}

/**
 * 根据txtKey的值，移除对应的value
 * */
function btnRemove_click() {
    var key = $("txtKey").value;
    sessionStorage.removeItem(key);
    alert("移除成功");
}


/**
 * 1、根据txtKey的值，获取value
 * 2、获取所有的value，并且显示
 * */
function btnShow_click() {
    //1、根据txtKey的值，获取value
    //findByKey();
    findAll();
}

//1、根据txtKey的值，获取value
function findByKey() {
    var key = $("txtKey").value;
    var value = sessionStorage.getItem(key);
    alert(value);
}

/**
 * 获取sessionStorage中所有的数据
 * length：获取长度
 * 循环遍历每一个key，key（index）
 * getItem（key）
 * */
function findAll() {
    $("body").innerHTML = "";//清空一下
    //获取所有数据长度
    var length = sessionStorage.length;
    for (var i = 0; i < length; i++) {
        //根据i的值，获取对应的key
        var key = sessionStorage.key(i);
        var value = sessionStorage.getItem(key);

        var tr = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");

        td1.innerHTML = key;
        td2.innerHTML = value;
        tr.appendChild(td1);
        tr.appendChild(td2);
        $("body").appendChild(tr);
    }
}

/**获取txtKey，txtValue的值，并且保存到sessionStorage中
 * sessionStorage.setItem(key,value);
 */
function btnSave_click() {
    var key = $("txtKey").value;
    var value = $("txtValue").value;
    //保存进sessionStorage
    sessionStorage.setItem(key, value);
    window.alert("保存成功");
}


window.addEventListener("load", initial, false);