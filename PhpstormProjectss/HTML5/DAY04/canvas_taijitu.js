function $(id) {
    return document.getElementById(id);
}
//后画的东西会压在前画的上面
function initial() {
    var canvas = $("canvas");
    ctx = canvas.getContext("2d");
    //绘制矩形
    /* ctx.strokeRect(0,0,400,300);*/
    ctx.rect(0, 0, 400, 300);
    ctx.fillStyle = "yellow";
    // ctx.stroke();//绘制线条
    // ctx.fillRect(0,0,400,300);
    ctx.fill();
    //绘制路径 beginPath() closePath() moveTo() lineTo() stroke()
    //画圆
    ctx.beginPath();
    //黑圆
    ctx.arc(200,150,100,Math.PI/2,Math.PI*3/2,false);
    ctx.fillStyle="black";
    ctx.fill();
    ctx.closePath();
    //白圆
    ctx.beginPath();
    ctx.arc(200,150,100,Math.PI/2,Math.PI*3/2,true);
    ctx.fillStyle="white";
    ctx.fill();
    //小黑圆
    ctx.beginPath();
    ctx.arc(200,100,50,0,2*Math.PI,false);
    ctx.fillStyle="black";
    ctx.fill();
    ctx.closePath();
    //小白圆
    ctx.beginPath();
    ctx.arc(200,200,50,0,2*Math.PI,false);
    ctx.fillStyle="white";
    ctx.fill();
    ctx.closePath();
    //小小白圆
    ctx.beginPath();
    ctx.arc(200,100,10,0,2*Math.PI,false);
    ctx.fillStyle="white";
    ctx.fill();
    ctx.closePath();
    //小小黑圆
    ctx.beginPath();
    ctx.arc(200,200,10,0,2*Math.PI,false);
    ctx.fillStyle="black";
    ctx.fill();
    ctx.closePath();

}

window.addEventListener("load", initial, false);