/*图片轮播*/

/*js图片轮播*/
/*
var lol_index = 0;//将第一个图片默认设置为0
function start() {

    setInterval(function () {
        //接收图片
        var lol_photos = document.getElementById("lol_photos");

        var lol_lis = lol_photos.getElementsByTagName("li");

        //隐藏所有图片
        for (var i = 0; i < lol_lis.length; i++) {
            lol_lis[i].className = "hide";

        }
        //显示下一个图片
        lol_index++;
        lol_lis[lol_index % lol_lis.length].className = "show";
    }, 1000)

}*/
/*jquery图片轮播一*/
/*
$(function () {
    //先设置一个循环变量index
    var index = 0;
    //调用定时函数setInterval();
    setInterval(function () {
        // 取ul下的li
        var $lis = $("#lol_photos li");
        console.log($lis);
        $lis.eq(index%$lis.length).animate({'left':'963'},2000);
        var a = (++index % $lis.length);
        $lis.eq(a).show();
        $lis.eq(a).animate({'right':'963'},2000)
    }, 2000);
    //1.先将所有图片隐藏或者用选择器（：hide）将可见的隐藏
    //2.将下一张图片显示


});*/
/*jquery图片轮播二*/
$(function () {
    setInterval(roll, 2000);
});

function roll() {
    //使用animate将ul容器左外边距-960px,两张图片就都会向左移动
    $("#lol_photos").animate({'left': "-960px"}, function () {
        //使用回调函数,设置使容器左外边距回到0，使两张图片的基点回到原位置
        $(this).css({left: "0px"});
        //移除正在第一张图片位置并复制这张图片，追加到ul》li的最后面
        $(this).children("li").first().remove().clone(true).appendTo(this);
    })


}

/*联动菜单*/
//事先预置好颜色
var colors = [
    ["red", "blue", "white"],
    ["green", "black", "yellow"],
    ["white", "black", "red"],
    ["purple", "yellow", "scarlet"],
    ["yellow", "blue", "purple"]

];

function change() {
    //获取当前英雄
    var hero = document.getElementById("hero");
    var hindex = hero.value;
    //删除所有颜色
    var color = document.getElementById("color");
    color.innerHTML = "";
    //然后重新添加颜色
    var hcolor = colors[hindex];
    for (var i = 0; i < hcolor.length; i++) {
        //创建option节点
        var option = document.createElement("option");
        //设置新节点的值
        option.setAttribute("value", i);
        option.innerHTML = hcolor[i];
        //将option传给color；
        color.appendChild(option);
    }
}

/*删除*/
function dele() {
    //删除成功给予提示
    var p = document.getElementById("del");
    p.className = "show";
    //两秒后消失

    var id = setTimeout(
        function () {

            p.className = "hide";
            clearTimeout(id);

        }, 2000)

}
$(document).ready(function() {
    $("#accordion").accordion({active:2,collapsible: true });//active:2默认展开第三个
});
