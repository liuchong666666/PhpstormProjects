/**自己写的插件--对象方法*/
//添加对象方法 jQuery.fn.method=function()
jQuery.fn.changeBgColor = function () {
    //this表示当前的jQuery对象
    this.css({"background": "red"});

};
jQuery.fn.swapClass = function (c1, c2) {
    //这里 this表示当前的jQuery对象，没在each里面
    /*  for(var i=0;i<this.length;i++){
//                     alert($("#ul>li").eq(i).css("font-weight"));
          if((this.eq(i).css("font-weight"))==400){
              this.eq(i).css("font-weight","bold");
          }
          else if((this.eq(i).css("font-weight"))==700){
              this.eq(i).css("font-weight","normal");
          }
      }*/
    /*这样不行，会把所有的样式移除再添加，所以得遍历
     if (this.hasClass(c1)) {
            this.removeClass(c1).addClass(c2);
        } else {
            this.removeClass(c2).addClass(c1);
        }
     */
    /*用for
   for (var i = 0; i < this.length; i++) {
        if (this.eq(i).hasClass(c1)) {
            this.eq(i).removeClass(c1).addClass(c2);
        } else {
            this.eq(i).removeClass(c2).addClass(c1);
        }
    }*/
    //用each
    var $obj = this.each(function () {
        //this表示当前的DOM元素，一定要记住只要在each里面，this表示当前的DOM元素，死记，没有为什么
        //hasClass()是jQuery对象的方法,所以得将this转为jQuery对象
        var $elem = $(this);
        if ($elem.hasClass(c1)) {
            $elem.removeClass(c1).addClass(c2);
        } else {
            $elem.removeClass(c2).addClass(c1);
        }
    })
    return $obj;//方法连缀，如果是数组就这样return $obj，  如果是单个就return this
}