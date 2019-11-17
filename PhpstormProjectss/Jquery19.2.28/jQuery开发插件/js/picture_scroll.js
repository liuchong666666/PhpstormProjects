/**图片轮播插件*/
//1.遍历传入进来的图片
//2.图片轮播：
//  2.1图片整体每两秒往左移一个
//  2.2当移到最后一个，又整体还原
jQuery.fn.pic_scroll = function () {
    // 这里this是jQuery对象

    this.each(
            function () {
                // 这里this是dom对象
                $(this).animate({left: "-500px"}
                    , function () {
                        console.log(this);
                        $(this).css({"left": "0px"});
                        $(this).children().eq(0).remove().clone().appendTo($(this));
                    }
                )
            }
        )
}
