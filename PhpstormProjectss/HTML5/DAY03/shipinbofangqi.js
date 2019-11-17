/*function $(id) {
    return document.getElementById(id);
}

function initial() {
    video = $("media");
    btnPlay = $("btnPlay");
    progress = $("progress");
    btnPlay.addEventListener("click", btn_play, false);
    video.addEventListener("durationchange", video_durationchange, false);
}

function video_durationchange() {
    totalDuration =parseInt(video.duration);

    console.log(totalDuration);
}
function btn_play() {
    var time =5-totalDuration;
    if (video.ended || video.paused) {
        video.play();
         time2 = setInterval(function () {
             if( time==5||video.paused){
                 clearInterval(time2);
             }
            time += 1 ;
            bgcolor.style.width = time*120+"px";
            console.log(time);

        },1000);
        btnPlay.value = "暂停";

    } else if (video.played) {
        video.pause();
        btnPlay.value = "播放";
    }
}


window.addEventListener("load", initial, false);
*/

function $(id) {
    return document.getElementById(id);
}

function initial() {

    video = $("media");
    btnPlay = $("btnPlay");
    bar = $("bar");
    btnPlay.addEventListener("click", btn_click, false);
    video.addEventListener("durationchange", video_durationchange, false);
    bar.addEventListener("click",getTime,false);
}

function video_durationchange() {
    video_duration = parseInt(video.duration);
    console.log(video_duration);
}

function btn_click() {
    if (video.paused || video.ended) {
        video.play();
        btnPlay.value = "播放";
        loop = setInterval(cal, 1000);
    } else if(btnPlay.value == "播放"){
        video.pause();
        btnPlay.value = "暂停";
    }
}

//计算步长
function cal() {
    if (!video.ended) {
        var maxim = (bar.offsetWidth);
        var total = video.currentTime * (maxim / video_duration);
        $("progress").style.width = total + "px";
    } else {
        $("progress").style.width = "0px";
        clearInterval(loop);
    }
}

//点击div完成指定时间播放
//1、currentTime
//  video.currentTime = 3;
//  600 / video.duration
// width / 600  = t  /  video.duration
//  currentTime = 公式计算的时间
//2、event时间对象
// function getPoint(e){
//  e.pageX;当前鼠标在屏幕上的横坐标
//  width = e.pageX - bar.offsetLeft;
// }
//div.offsetLeft //div距离左边屏幕的距离

function getTime(e){
    //div点击的长度
    var length = e.pageX -  bar.offsetLeft;
    var t =length/(bar.offsetWidth/video_duration);//点击的当前时间
    console.log(t);
    console.log(video.currentTime);
    video.currentTime = t;
    console.log(video.currentTime);
    // console.log(video.currentTime);
    var maxim = (bar.offsetWidth);
    var total = video.currentTime * (maxim / video_duration);
    $("progress").style.width = total + "px";
    // clearInterval(loop);
    loop = setInterval(cal, 1000);
}
window.addEventListener("load", initial, false);


/*挂服务器上可以运行！！！！！！！！！！！！！！！！！！！！！！！！*/