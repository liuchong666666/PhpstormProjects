function $(id) {
    return document.getElementById(id);
}

function initial() {
    //获取canvas以及绘图上下文
    var canvas = $("canvas");
    ctx = canvas.getContext("2d");
    btnRect = $("btnRect");
    btnScale = $("btnScale");
    btnSaveStatus = $("saveStatus");
    btnRestoreStatus = $("restoreStatus");
    btnTran = $("btnTran");

    btnRect.addEventListener("click", btnRect_click, false);
    btnScale.addEventListener("click", btnScale_click, false);
    btnSaveStatus.addEventListener("click", btnSaveStatus_click, false);
    btnRestoreStatus.addEventListener("click", btnRestoreStatus_click, false);
    btnTran.addEventListener("click", btnTran_click, false);
}

/**
 * 更换画布原点，由默认的（0，0）更改为（100，100）
 * */
function btnTran_click() {
    ctx.translate(100, 100);
    alert("原点更换成功");
}

/**
 * 保存画布当前状态，比如缩放等。。。
 * save（）
 * */
function btnSaveStatus_click() {
    ctx.save();
}

/**
 * 恢复画布状态到最近一次的save时候
 * */
function btnRestoreStatus_click() {
    ctx.restore();
}


/**
 * 随即位置绘制大小为100*100的矩形
 * */
function btnRect_click() {
    var x = parseInt(Math.random() * 600);
    var y = parseInt(Math.random() * 500);

    /*   var x = 0;
       var y = 0;*/

    //设置填充颜色
    ctx.fillStyle="rgba(99,155,201,1)";//填充颜色
    ctx.strokeStyle="rgba(99,155,201,1)";//边框颜色
    ctx.globalAlpha ="0.5";//透明度,可以忽略，  因为上面用的是rgba有透明度，如果是rgb，red，#000；可以用这个
    //ctx为canvas绘图上下文
    ctx.strokeRect(x, y, 100, 100);
    // ctx.fillRect(x,y,100,100);
}

/**
 *将ctx的缩放增大至2呗
 * ctx.scale(2,2);
 * */
function btnScale_click() {
    ctx.scale(2, 2);
}

window.addEventListener("load", initial, false);