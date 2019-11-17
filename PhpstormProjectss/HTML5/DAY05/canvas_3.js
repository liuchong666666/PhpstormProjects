function $(id) {
    return document.getElementById(id);
}

function initial() {
    var canvas = $("canvas");
    var ctx = canvas.getContext("2d");

    //绘制一幅图像到canvas上
    var img = new Image();
    img.src = "../img/bike.jpg";
    //等待图像加载完毕时，绘制图像到canvas上
    img.onload = function () {

        // drawImage(img,x,y)绘制图像
        // drawImage(img,x,y，width,height)绘制图像
        //   ctx.drawImage(img, 150, 120);


        //填充矩形框，内容为图象平铺
        //1、创建平铺对象ctx.createPattern(image,repeat)
        var ptrn = ctx.createPattern(img, 'repeat');//repeat和css平铺属性一样的取值
        //2、将返回值设置给fillstyle属性
        ctx.fillStyle = ptrn;//fillStyle也可以放渐变
        //3、填充矩形
        ctx.fillRect(0, 0, 400, 300);


    }
    //切割图像
    ctx.beginPath();
    ctx.arc(150,150,50,0,Math.PI*2,true);//设置好要切割的区域
    // ctx.stroke();
    ctx.clip();//切割
    ctx.closePath();

}

window.addEventListener("load", initial, false);