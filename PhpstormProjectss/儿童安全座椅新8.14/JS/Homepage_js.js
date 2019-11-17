//图片轮播
var index = 0;//默认第一个图片设为0
function start() {
    setInterval(
        function () {
            //接收这一组图片
            var ul = document.getElementById("head_foot_photos");
            var lis = ul.getElementsByTagName("li");

            //隐藏所有图片
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = "hide";
            }
            //将下一个index显示
            index++;
            lis[index % lis.length].className = "show";
        }, 4000
    )
}

//按钮
function cal(e) {
    //1。获取事件源，只处理button的事件
    var obj = e.srcElement || e.target;
    // alert(obj.nodeName);//元素名
    if (obj.nodeName != "BUTTON") {
        return;
    }
    else {
        var target = e.target;
        // var div = target.parentNode.parentNode.parentNode;
        var top_hr = document.getElementById("top_hr");
        var hrs = top_hr.getElementsByTagName("hr");

        // alert(hrs.nodeName);
        // alert(target.value);

        for (var i = 0; i < hrs.length; i++) {
            hrs[i].className = "hide1";
        }
        //将hr显示
        hrs[target.value].className = "show1";
        // alert(target.value);
    }


}