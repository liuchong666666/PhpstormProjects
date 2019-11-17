function $(id) {
    return document.getElementById(id);
}

function initial() {
    var canvas = $("canvas");
    ctx = canvas.getContext("2d");
    //创建渐变对象
    // var grad = ctx.createLinearGradient(0,0,400,400);//直线渐变(x1,y1,x2,y2)
    var grad = ctx.createRadialGradient(100, 100, 50, 400, 400, 50);//圆形渐变（x1,y1,r1,x2,y2,r2）
    //增加渐变
    //从0(左上角) 开始到 0.5位置处（中点）红  再到1（末尾）蓝
    grad.addColorStop(0.5, "red");
    grad.addColorStop(0.8, "yellow");
    grad.addColorStop(1, "blue");

    ctx.fillStyle = grad;

    ctx.fillRect(0, 0, 400, 400);

}

window.addEventListener("load", initial, false);