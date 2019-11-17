function $(id){
    return document.getElementById(id);
}
function initial(){
    canvas=$("canvas");
    ctx=canvas.getContext("2d");
    var x=0,y=0,x1=0,y1=0;
    var img=new Image();
    var img1=new Image();
    img.src="../img/background.png";
    img1.src="../img/background.png";
    setInterval(function () {
        ctx.drawImage(img,x,y);
        ctx.drawImage(img1,x1,y1-850);
        y += 10;
        if(y==850){
            y=-850;

        }
        y1 +=10;
        if(y1==1700){
            y1=0;

        }
    },100);

}

window.addEventListener("load",initial,false);