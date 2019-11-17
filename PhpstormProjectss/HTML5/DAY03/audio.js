function $(id){
    return document.getElementById(id);
}
function initial(){
    playBtn = $("playBtn");
    checkBtn = $("checkBtn");
    media = $("media");
    checkBtn.addEventListener("click",checkBtn_click,false);
    playBtn.addEventListener("click",playBtn_click,false);
}
function playBtn_click(e) {
    if(media.paused){
        media.play();
        e.target.value = "暂停";
    }else{
        media.pause();
        e.target.value="播放";

    }
}
function checkBtn_click() {
    var audio = document.createElement("audio");

    console.log(audio.canPlayType("audio/mp3"));
}
window.addEventListener("load",initial,false);