function $(id) {
    return document.getElementById(id);
}

function initial() {
    console.log("初始化完成。。。。");
    //1、获取video元素
    video = $("media");
    btnPlay=$("btnPlay");
    btnPause=$("btnPause");
    vdoDuration=$("vdoDuration");

    //2、加载事件
    //2.1 canplaythrough
    video.addEventListener("canplaythrough", video_canplaythrough, false);
    //2.2 ended ：更换一个视频文件
    video.addEventListener("ended", video_ended, false);
    //2.3 pause ：显示一幅图像(广告)
    video.addEventListener("pause", video_pause, false);
    //2.4 play  ： 将图像隐藏
    video.addEventListener("play", video_play, false);
    //2.5通过按钮进行播放
    btnPlay.addEventListener("click",btnPlay_click,false);
    //2.6通过按钮进行暂停
    // btnPause.addEventListener("click",btnPause_click,false);

    //3、初始化操作中的其他操作
   /* var totalDuration = video.duration;//视频总体时间长度
    console.log(totalDuration);
    vdoDuration.innerHTML=totalDuration;*/
    video.addEventListener("durationchange",video_ondurationchange,false);

}

//视频总长度
function video_ondurationchange() {
    totalDuration = video.duration;
    vdoDuration.innerHTML=(totalDuration)+"秒";
}
/*播放或暂停*/
function btnPlay_click(e){
    // video.play();
    if(video.paused||video.ended){
        //暂停中。。。
        //1、视频播放
        //2、文本更改为暂停


      var  time = setInterval(function () {
            totalDuration -= 1;
            console.log(totalDuration);
            if(totalDuration<=0||video.paused){
                clearInterval(time);
            }
            vdoDuration.innerHTML=(totalDuration)+"秒";
        },1000);


        video.play();
        e.target.value="暂停";
    }else {
        //视频播放中。。。
        //1、视频暂停
        //2、文本更改为播放
        video.pause();
        e.target.value="播放";
    }
}
function btnPause_click(e) {
    video.pause();
}
function video_canplaythrough(e) {
    console.log("视频已经全部下载完毕，请尽情 观赏...");
}

function video_ended(e) {
    video.style.display = "none";
    $("advImg").style.display = "none";
}

/*视频开始播放时，所激发的事件（暂停--》播放、停止--》播放）*/
function video_play(e) {
    $("advImg").style.display = "none";
}

function video_pause(e) {
    $("advImg").style.display = "block";
}

window.addEventListener("load", initial, false);
