function $(id) {
    return document.getElementById(id);
}

function initial() {
    var canvas = $("canvas");
    var ctx = canvas.getContext("2d");
    //设定线条粗细：lineWidth：1
    //设定线条线帽：lineCap：butt/round/square//后面两个会稍微增加线条的长度
    //设定两条线焦点：lineJoin:miter（默认，尖角）/round/bevel
    //miterLimit:当lineJoin为miter时，设置两点相交形成的锐角长度，默认为10，尽量不超过10

    ctx.lineWidth=10; //如果canvas小了的话 会出现铅笔前面三角形形状
    ctx.lineCap="butt";//默认
    ctx.lineCap="square";//方形会稍微增加线条的长度
    ctx.lineCap="round";//圆形会稍微增加线条的长度

    ctx.lineJoin="bevel";
    ctx.lineJoin="round";
    ctx.lineJoin="miter";
    ctx.miterLimit=3;


    //移动笔触 ，这个方法不会改变canvas的原点  //也可以用translate 但是这个方法会改变canvas的原点
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(100,100);
    ctx.lineTo(80,50);
    //设置线条颜色
    ctx.strokeStyle="#FF0000";
    //绘制线条
    ctx.stroke();
    ctx.closePath();
}

window.addEventListener("load", initial, false);