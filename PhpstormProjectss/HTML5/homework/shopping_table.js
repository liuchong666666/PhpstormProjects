function $(id) {
    return document.getElementById(id);
}

function initial() {
    get_goods();
}


function get_goods() {
    $("tbody").innerHTML = "";
    var totalPrice = [];//存放数量
    console.log(1);
    if (typeof(Storage) !== "undefined") {//支持web存储
        if (localStorage.length > 0) {
            console.log(2);
            /**
             * 14122amount    3 ---------数量
             *14122goods    手链-------名称
             *14122Number    14122------编号
             * 14121price    5988.00-----价格
             * */
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);

                // console.log(key);
                if (key.search("Number") != -1) {//匹配字符串里面有Number的
                    //console.log(key);
                    var Number = key.substring(0, 5);//获取编号
                    var Number_goods = Number + "goods";//键 名称
                    var Number_price = Number + "price";//键  价格
                    var Number_amount = Number + "amount";//键  数量
                    //获取物品名称
                    var goods = localStorage.getItem(Number_goods);
                    console.log(goods);
                    //获取物品价格
                    var price = localStorage.getItem(Number_price);
                    console.log(price);
                    //获取物品数量
                    var amount = localStorage.getItem(Number_amount);
                    console.log(amount);
                    var td1 = document.createElement("td");
                    td1.innerHTML = goods;
                    var td2 = document.createElement("td");
                    td2.innerHTML = price;
                    var td3 = document.createElement("td");
                    td3.innerHTML = amount;
                    var tr = document.createElement("tr");
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    $("tbody").appendChild(tr);
                    var one_Price= parseInt(amount)*parseInt(price);
                    totalPrice.push(one_Price);
                }
            }
            cal_total(totalPrice);
        }
        else {
            console.log(3);
            $("tbody").style.textAlign = "center";
            $("tbody").innerHTML = "没有物品";
        }
    } else {
        alert("该浏览器不支持web存储");
    }

}

function cal_total(array) {
    //计算总价
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        sum += parseInt(array[i]);//
       // console.log(typeof(array[i]));//字符串

    }
    $("total").value=sum;

}

function change_storage() {
    get_goods();
}

window.addEventListener("load", initial, false);
window.addEventListener("storage", change_storage, false);