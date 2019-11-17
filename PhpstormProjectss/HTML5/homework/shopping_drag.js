function $(id) {
    return document.getElementById(id);
}

function initial() {
    img = document.getElementsByTagName("img");
    gouwuche = $("gouwuche");
    for (var i = 0; i < img.length; i++) {
        // amount= img[i].getAttribute("amount");
        // console.log(amount);
        img[i].addEventListener("dragstart", img_dragstart, false);
        img[i].addEventListener("drag", img_drag, false);
        img[i].addEventListener("dragend", img_dragend, false);
    }
    gouwuche.addEventListener("dragenter", gouwuche_dragenter, false);
    gouwuche.addEventListener("dragover", gouwuche_dragover, false);
    gouwuche.addEventListener("drop", gouwuche_drop, false);
    gouwuche.addEventListener("dragleave", gouwuche_leave, false);
    // img.addEventListener("dragstart",img_start,false);
    goods_load();
}

//目标区域
function gouwuche_dragenter(e) {
    $("d_enter").innerHTML = "进入目标区域";
    $("d_leave").innerHTML = "";
    $("d_drop").innerHTML = "";
    e.preventDefault();
}

function gouwuche_dragover(e) {
    var x = e.offsetX;
    var y = e.offsetY;
    $("d_over").innerHTML = x + ":" + y;
    $("d_leave").innerHTML = "";
    $("d_drop").innerHTML = "";
    e.preventDefault();
}

var a = 0;

function gouwuche_drop(e) {
    $("d_drop").innerHTML = "已经投放";
    $("d_leave").innerHTML = "";
    $("d_enter").innerHTML = " ";

/**
 * 14122amount	3 ---------数量
 *14122goods	手链-------名称
 *14122number	14122------编号
 * 14121price	5988.00-----价格
 * */
    //支持web存储
    if (typeof(Storage) !== "undefined") {
        var imgName = e.dataTransfer.getData("text");
      //  console.log(imgName);
        var num = localStorage.getItem("number") || 0;//var num = 0; //解决localstorage覆盖问题：覆盖是因为你每次存储时名字没变
       // console.log(num);
        var values = [];//存数据中的value值（local storage里面的value）
        var name = imgName + "Number";

        /*存物品价格*/
        //获取物品价格
        var price=document.getElementsByName(imgName)[0].getAttribute("price");
        var goods_price=imgName+"price";
        localStorage.setItem(goods_price,price);


        /*存数量以及赋值数量*/
        var goodsAmount = imgName + "amount";
        // console.log(goodsAmount);
        //进来的时候就将amount赋值给物品
        var amounts = localStorage.getItem(goodsAmount) || 0;
        // if (amounts != null) {  }else {}
        // console.log("amounts" + amounts);
        document.getElementsByName(imgName)[0].setAttribute("amount", amounts);

        var amount = document.getElementsByName(imgName)[0].getAttribute("amount");//获取img的amount值//如果存在就加1
        // console.log("amount" + amount);
        amount++;//数量加1
        localStorage.setItem(goodsAmount, amount);//存储商品对应的物品数量
        amounts = localStorage.getItem(goodsAmount);//再次获取值并将值赋给物品
        document.getElementsByName(imgName)[0].setAttribute("amount", amounts);
        // console.log("amounts" + amounts);


        /*存物品名称*/
        var goodsName = document.getElementsByName(imgName)[0].getAttribute("goodsName");//获取物品名称
        var goodsStorage = imgName + "goods";
        localStorage.setItem(goodsStorage, goodsName);//存物品名字


        if (localStorage.length > 0) {
            //遍历所有的value值 并把其放入values数组里面
            for (var i = 0; i < localStorage.length; i++) {
                var keyname = localStorage.key(i);//获取所有的key，
                var value = localStorage.getItem(keyname);//然后将对应的值输出出来
                values.push(value);//将值存入数组中
            }
            //将要放入的值与数据里面已经有的值（values数组）想比较，如果一致就显示存在，并返回false，反之 true
            // retrun true； 返回正确的处理结果。
            // return false；分会错误的处理结果，终止处理。
            // return；把控制权返回给页面。
            for (var i = 0; i < values.length; i++) {
                if (imgName == values[i]) {
                    alert("已经存在" + imgName + "," + values[i]);
                    $("data").innerHTML = "共有" + num + "件商品";
                    return false;//return false来阻止提交表单或者继续执行下面的代码，通俗的来说就是阻止执行默认的行为。
                }
            }
            //返回true则加入并存入数据
            localStorage.setItem(name, imgName);//存入物品的name 编号
            alert("加入成功" + imgName + "," + name);
            num++;
            localStorage.setItem("number", num);//将num存入数据中
            $("data").innerHTML = "共有" + num + "件商品";
        } else {
            localStorage.setItem(name, imgName);//存入物品的name 编号
            alert("加入成功");
            num++;//var num = 0; //解决localstorage覆盖问题：覆盖是因为你每次存储时名字没变
            localStorage.setItem("number", num);//将num存入数据中
            $("data").innerHTML = "共有" + num + "商品";
        }
    } else {
        //抱歉！不支持web存储
    }
    e.preventDefault();
}

function gouwuche_leave(e) {
    $("d_leave").innerHTML = "离开目标区域";
    $("d_enter").innerHTML = " ";
    $("d_over").innerHTML = "";
    $("d_drop").innerHTML = "";
    e.preventDefault();

}

//图片
function img_dragstart(e) {
    $("d_start").innerHTML = "拖拽开始" + e.target.name;
    $("d_end").innerHTML = "";
    var imgName = e.target.name;
    // var amount = e.target.getAttribute("amount");
    e.dataTransfer.setData("text", imgName);
//    e.dataTransfer.setData("text", amount);
}

function img_drag(e) {
    var x = e.pageX;
    var y = e.pageY;
    $("d_drag").innerHTML = x + ":" + y;
}

function img_dragend(e) {
    $("d_end").innerHTML = "拖拽结束";
    $("d_start").innerHTML = "";
}

// 商品加载
function goods_load() {
    //设置购物车提示框的值
    var num = localStorage.getItem("number")||0;
    $("data").innerHTML = "共有" + num + "件商品";
    //进来就存储的amount赋值给物品
    // var reg = new RegExp(/^\d{5}$/);//至少五位数字

    if (typeof(Storage) !== "undefined") {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);//取出对应的键
            if (key.search("amount")!=-1) {//如果符合name属性，就设置相应的amount数值
                //截取数字部分  相当于img属性name的值
                var goods = key.substring(0,5);
                console.log(goods);
                var amounts = localStorage.getItem(key);
                //赋值amounts
                document.getElementsByName(goods)[0].setAttribute("amount", amounts);
            }
        }
    } else {
        alert("浏览器不支持web存储！");
    }


}
function change_storage() {
   goods_load();
}
window.addEventListener("load", initial, false);
window.addEventListener("storage",change_storage,false);