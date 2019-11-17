function $(id) {
    return document.getElementById(id);
}

function initial() {
    var canvas = $("canvas");
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(80,95);
    ctx.lineTo(80,200);
    ctx.stroke();
    //设置文本
    //属性：
    //  font: 与css相似
    //  textAlign：水平对齐方式： left/center/right
    //  textBaseLine：垂直对齐方式： top/middle/bottom
    //方法:
    //strokeText(text,x,y):在指定位置处绘制文本的轮廓
    //fillText(text,x,y):在指定位置处绘制填充的文字
    //measureText(text):通过该返回值的width属性，能够获取当前文本的宽度
    ctx.beginPath();//文本这个可加可不加，文本是闭合的
    ctx.font="bold 24px  微软雅黑";//属性直接赋值
    ctx.strokeText("你好，世界！",20,20);//可以用来记录游戏分数，文字换成变量
    ctx.fillText("你好，世界！",35,35);
    ctx.closePath();//文本这个可加可不加，文本是闭合的



    //设置阴影
    //属性：
    //shadowColor:采用css语法设置阴影颜色
    //shadowOffsetX：水平投射距离
    //shadowOffsetY：垂直投射距离
    //shadowBlur：模糊效果
    ctx.beginPath();
    ctx.shadowColor="#FF0000";
    ctx.shadowOffsetX=5;
    ctx.shadowOffsetY=5;
    ctx.shadowBlur=5;
    ctx.font="bold 24px 微软雅黑";
    ctx.fillText("微软雅黑",80,95);
    ctx.closePath();


    ctx.beginPath();
    ctx.shadowColor="#FF0000";
    ctx.shadowOffsetX=5;
    ctx.shadowOffsetY=5;
    ctx.shadowBlur=5;
    ctx.font="bold 24px 微软雅黑";
    ctx.textAlign="left";//与默认的一样
    ctx.textAlign="right";//右边的字右上角在这里
    ctx.textAlign="center";//坐标在所有字中点
    ctx.fillText("微软雅黑",80,95);//写字时以这坐标为基点，字往右写（最左边的字左上角在这里）
    ctx.closePath();




}

window.addEventListener("load", initial, false);