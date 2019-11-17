//1、定义两个数组
// 1.1  定义存歌名数组 m_name
//  1.2 定义存歌地址的数组 m_src
// 2、将歌名数组取出来，放到html页面里面
// 2.1 遍历歌名数组
// 2.2 将每个遍历出来的歌名通过标签追加到tbody下面
//3 当播放完后 就播放下一首， 轮流播放
//4 切歌、 一点击换歌就随机生成其他五首歌，通过random实现
var m_name = [], m_src = [], randomNums = [];//randomNums存随机数
//定义取数的次数。多一次，因为i从0开始
var RANDOMNUM = 4;

function $(id) {
    return document.getElementById(id);
}

function initial() {
    m_name = [
        "Minstrel - eyecatch!.mp3",
        "Heitor Pereira - Theme from the Monkees.mp3",
        "我爱的人走了",
        "极与极",
        "我已经爱上你",
        "Heitor Pereira - Theme from the Monkees.mp3",
        "十大金曲串烧",
        "乌云中",
        "心如止水",
        "无味",
        "李白",
        "再给我一分钟",
        "我要找到你",
        "往后余生"];

    m_src = [
        "../music/Minstrel - eyecatch!.mp3",
        "../music/Heitor Pereira - Theme from the Monkees.mp3",
        "../music/宋宇航 - 我爱的人走了.mp3",
        "../music/张嫮目 - 极与极.mp3",
        "../music/情词尧,二郎 - 我已经爱上你（情词尧／二郎）.mp3",
        "../music/Heitor Pereira - Theme from the Monkees.mp3",
        "../music/汪苏泷,徐良 - 十大金曲串烧(现场版).mp3",
        "../music/艾热 - 乌云中.mp3",
        "../music/药尘,夏夏 - 心如止水（女声版）（Cover：Ice Paper）.mp3",
        "../music/郑胖 - 无味.mp3",
        "../music/陈嬛 - 李白 - 爵士英文版.mp3",
        "../music/陈庆 - 再给我一分钟.mp3",
        "../music/陈明 - 我要找到你.mp3",
        "../music/马良 - 往后余生.mp3",
    ];


    $("media").addEventListener("canplay", getTime, false);
    $("media").addEventListener("play", music_play, false);
    loadmusic();
}


/**
 * 倒计时
 * */
function music_play(e) {
    loop = setInterval(function () {
        var counts = e.target.duration - e.target.currentTime;
        $("music_time").innerHTML = formatTime(counts);
    }, 1000);
}

/**
 * 判断是否重复
 * */
function checkRExists(r) {
    for (var i = 0; i < randomNums.length; i++) {
        if (r == randomNums[i]) {
            console.log("重复" + r);
            return true;
        }
    }
    return false;
}

/**
 *生成五个随机数
 * */
function createRandNums() {
    var i = 0;
    for (; ;) {
        // 生成随机数
        var r = parseInt(Math.random() * m_name.length);
        //判断是否重复
        if (checkRExists(r)) {
            continue;//如果重复就跳过
        }
        randomNums[i] = r;
        //当等于定义取数的次数就退出函数
        if (i == RANDOMNUM) {
            return;
        }
        i++;
    }
}


/**
 * 加载歌曲：随机五首歌
 */
function loadmusic() {
    $("tbody").innerHTML = "";
    //五个随机数 randomNums[i]   i
    //随机加载五首歌
    //  将五首歌加载到table列表中
    createRandNums();
    console.log(randomNums);
    for (var i = 0; i < randomNums.length; i++) {
        var mName = m_name[randomNums[i]];
        var mSrc = m_src[randomNums[i]];
        console.log(mName);
        var aTar = document.createElement("a");
        aTar.innerHTML = mName;
        aTar.setAttribute("href", "javascript:play('" + mName + "','" + mSrc + "');");
        var td = document.createElement("td");
        td.appendChild(aTar);
        var tr = document.createElement("tr");
        tr.appendChild(td);
        $("tbody").appendChild(tr);
    }
}

/**
 * 播放音乐
 * */
function play(name, src) {
    $("music_name").innerHTML = name;
    $("media").src = src;
}

/**
 * 当媒体下载到可放帧时所激发的事件
 * */
function getTime(e) {
    var seconds = Math.ceil(e.target.duration);//向上取整
    var time = formatTime(seconds);
    $("music_time").innerHTML = time;
    e.target.play();
}

/**
 * 格式化时间
 * */
function formatTime(seconds) {
    var mm = parseInt(seconds / 60);
    var ss = parseInt(seconds % 60);
    console.log(seconds / 60 + "," + seconds % 60);
    if (mm < 10) {
        mm = "0" + mm;
    }
    if (ss < 10) {
        ss = "0" + ss;
    }
    return mm + ":" + ss;
}

window.addEventListener("load", initial, false);


