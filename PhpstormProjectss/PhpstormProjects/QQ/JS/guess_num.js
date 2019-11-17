// 定义一个随机全局变量all
var all = parseInt(Math.random() * 100) + 1;

function guess() {
    // 接受input的值
    var input = document.getElementById("number");
    // 接受result的值
    var p = document.getElementById("result");
    // 定义一个字母m接受input的值
    var m = input.value;
    // 将m与all进行对比（大，小，对）
    if (m == "" || isNaN(m)) {
        p.innerHTML = "请输入1-100的数字";
    } else {
        if (m > all) {
            p.innerHTML = "大了！";
        } else if (m < all) {
            p.innerHTML = "小了！";
        } else {
            p.innerHTML = "恭喜你猜对了！";
        }
    }

}




