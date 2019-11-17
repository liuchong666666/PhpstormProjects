function $(id) {
    return document.getElementById(id);
}

/**
 * 初始化方法
 * 绘制三个矩形 实心、轮廓、擦除
 * fillRect(x,y,width,height)
 * strokeRect
 * clearRect
 *  x,y 左上角坐标   width,height 宽高
 * */
function initial() {
    //1、准备工作
    var canvas = $("canvas");
    ctx = canvas.getContext("2d");

    //轮廓
    ctx.strokeRect(100,100,300,300);
    //实心
    ctx.fillRect(120,120,260,260);
    //擦除
    ctx.clearRect(140,140,220,220);

}

window.addEventListener("load", initial, false);