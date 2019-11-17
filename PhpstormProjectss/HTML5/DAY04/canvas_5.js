function $(id) {
    return document.getElementById(id);
}

function initial() {
    var canvas = $("canvas");
    ctx = canvas.getContext("2d");
    //绘制路径 beginPath() closePath() moveTo() lineTo() stroke()
    //rect(x,y,width,height):生成一个矩形路径
    //当前笔触位置为（0，0）
    ctx.beginPath();
    //移动笔触位置到（35，80） A
    ctx.moveTo(35, 80);
    //画一条直线(100,100)       B        AB直线
    ctx.lineTo(100, 100);
    ctx.lineTo(200, 100);
    //闭合路径
    ctx.closePath();

    //设置背景颜色
    ctx.fillStyle = "blue";

    ctx.stroke();//绘制线条
    ctx.fill();//填充


    //绘制圆形context.arc(x,y,r,sAngle,eAngle,counterclockwise);
    //圆心x，圆形y，半径r，sAngle起始角（以弧度计，弧的圆形的三点钟位置是 0 度），eAngle结束角（以弧度计），counterclockwise规定应该逆时针还是顺时针（可选 true为逆时针）
    ctx.beginPath();
    ctx.arc(200,200,50,0,Math.PI*2,false);
    ctx.closePath();
    ctx.fillStyle="red";
    ctx.fill();

    //绘制半圆
    ctx.beginPath();
    ctx.arc(350,350,50,Math.PI/2,Math.PI*3/2,false);
    ctx.closePath();
    ctx.fill();
    //后画的东西会压在前画的上面
}

window.addEventListener("load", initial, false);