function $(id) {
    return document.getElementById(id);
}

function initial() {
//为img绑定事件：
    //1、开始拖拽时：dragstart
    //2、拖拽过程中：drag
    //3、结束拖拽：dragend

    //为tarDiv绑定事件（目标元素）
    //1、第一次进入到目标元素：dragenter
    //2、在目标元素内移动：dragover
    //3、投放：drop
    //4、源元素移出目标元素：dragleave


    var img = $("img");
    var tarDiv = $("tarDiv");
    var canvas = $("canvas");
    ctx = canvas.getContext("2d");
    //绑定事件
    img.addEventListener("dragstart", img_dragstart, false);
    img.addEventListener("drag", img_drag, false);
    img.addEventListener("dragend", img_dragend, false);

    tarDiv.addEventListener("dragenter", tarDiv_dragenter, false);
    tarDiv.addEventListener("dragover", tarDiv_dragover, false);
    tarDiv.addEventListener("drop", tarDiv_drop, false);
    tarDiv.addEventListener("dragleave", tarDiv_dragleave, false);

    canvas.addEventListener("dragenter", canvas_dragenter, false);
    canvas.addEventListener("dragover", canvas_dragover, false);
    canvas.addEventListener("drop", canvas_dragdrop, false);
    canvas.addEventListener("dragleave", canvas_dragleave, false);

}

function canvas_dragenter(e) {
    $("c_enter").innerHTML = "进入目标区域";
    $("c_leave").innerHTML = "";
    e.preventDefault();
}

function canvas_dragover(e) {
    var x = e.pageX;
    var y = e.pageY;
    $("c_over").innerHTML = x + ":" + y;
    e.preventDefault();
}

function canvas_dragdrop(e) {
    $("c_drop").innerHTML = "已经投放";
    /* var img=new Image();
     img.src="../img/bike.jpg";
     e.target.appendChild(img);*/
    // var img = new Image();
    // img.src = "../img/bike.jpg";
    var src = e.dataTransfer.getData("text");
    var img = new Image();
    img.src = src;
    var x = e.offsetX;
    var y = e.offsetY;
    ctx.drawImage(img, x, y);
    e.preventDefault();
}

function canvas_dragleave(e) {
    $("c_leave").innerHTML = "已经离开";
    $("c_enter").innerHTML = "";
    e.preventDefault();
}


function tarDiv_dragleave(e) {
    $("d_leave").innerHTML = "源元素已离开目标区域";
    $("d_enter").innerHTML = "";
    e.preventDefault();

}

function tarDiv_drop(e) {
    $("d_drop").innerHTML = "已经投放。。。";
    //创建指定图像
    /* var img = new Image();
     img.src = "../img/flower.png";
     e.target.appendChild(img);//将img追加到目标区域*/
    var src = e.dataTransfer.getData("text");
    // console.log(src);
    var img = new Image();
    img.src = src;
    e.target.appendChild(img);


    e.preventDefault();
}

function tarDiv_dragover(e) {
    var x = e.offsetX;//相对tarDiv区域的坐标
    // var x1=e.pageX;//绝对，相对body的坐标
    var y = e.offsetY;
    $("d_over").innerHTML = x + ":" + y;
    $("d_drop").innerHTML = " ";
    e.preventDefault();
}

function tarDiv_dragenter(e) {
    $("d_enter").innerHTML = "已经进入到目标区域";
    $("d_leave").innerHTML = "";
    //阻止默认操作
    e.preventDefault();
}


function img_dragstart(e) {
    //阻止默认操作
    // e.preventDefault();
    $("d_start").innerHTML = "开始拖拽。。。";
    $("d_end").innerHTML = "";


    //清空dataTransfer中的数据:该方法只能在dragstart 事件的处理程序中使用，因为这是拖动操作的数据存储只能写入的事件。
    //clearData()只能用在dragStart函数，在drop函数里是调用clearData()是没用的，而且也没必要，因为setData()保存的数据是在拖拽开始时创建，
    // 在拖拽放下也就是拖拽结束后，setData()保存的数据会被销毁。也就是setData()的数据只能在拖拽期间访问
    // e.dateTransfer.clearData("text");

    //获取图像路径
    var imgSrc = e.target.src;//拖拽时侯获取图像地址路径
    // console.log(imgSrc);
    //将地址保存进dataTransfer
    e.dataTransfer.setData("text", imgSrc);//如果很复杂的，哢成json字符串{a:"",b:""},要取出来就用evel获取或者其他第三方将json还原成json对象
    // console.log(src);

    //设置鼠标与图像的位置关系
    e.dataTransfer.setDragImage(e.target, 0, 0);
}

function img_drag(e) {
    var x = e.pageX;
    var x1 = e.clientX;
    var y = e.pageY;
    var y1 = e.clientY;
    $("d_drag").innerHTML = x + ":" + y + ",," + x1 + ":" + y1;
}

function img_dragend() {
    $("d_end").innerHTML = "源元素拖放结束。。。";
    $("d_start").innerHTML = "已经结束了";
}

window.addEventListener("load", initial, false);