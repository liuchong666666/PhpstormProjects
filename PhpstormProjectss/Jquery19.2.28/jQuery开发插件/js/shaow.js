jQuery.fn.shadow = function(){
    //this 表示JQUERY对象
    this.each(function(){
        $obj = $(this); //将遍历出来的DOM元素转换成JQUERY对象
        for(var i=0;i<5;i++){
            $obj.clone().css({
                position:"absolute",
                left:$obj.offset().left + i,
                top:$obj.offset().top + i,
                opacity:0.3,
                zIndex:-1,
                margin:0
            }).appendTo("body");
        }
    });
}

/**自己写的插件-阴影*/
/**使用简单参数实现阴影效果
 *slices:阴影重复数量
 * opacity：透明度，0-1之间
 * zIndex：层叠次序
 * */

jQuery.fn.shadow_simple = function (slices, opacity, zIndex) {
    // this表示jQuery对象
    this.each(function () {
        //这里面的this表示dom对象
        $obj = $(this);//将遍历出来的DOM元素转换成jQuery对象
        /*
            不用参数，i,opacity,zIndex固定值
          for (var i = 0; i <10; i++) {
                var $newobj = $obj.clone();
                $newobj.css({
                    //offset（）方法offset() 方法设置或返回被选元素相对于文档的偏移坐标。
                    position: "absolute",//脱离文档流，以body为父级
                    left: $obj.offset().left + i,//按照$obj的坐标向右偏移i,
                    top: $obj.offset().top + i,//按对于$obj的坐标向下偏移i
                    opacity: 0.15,
                    zIndex: -1,
                    margin: 0
                });
                $newobj.appendTo("body");
            }
            */
        //用参数
        for (var i = 0; i < slices; i++) {
            var $newobj = $obj.clone();
            $newobj.css({
                //offset（）方法offset() 方法设置或返回被选元素相对于文档的偏移坐标。
                position: "absolute",//脱离文档流，以body为父级
                left: $obj.offset().left + i,//按照$obj的坐标向右偏移i,
                top: $obj.offset().top + i,//按对于$obj的坐标向下偏移i
                opacity: opacity,
                zIndex: zIndex,
                margin: 0
            });
            $newobj.appendTo("body");
        }
    });
}
/**
 * 使用参数映射完成参数设置
 * option:参数对象，封装所有的参数信息
 *      slices:阴影重复数量
 *      opacity：透明度，0-1之间
 *      zIndex：层叠次序
 * */
jQuery.fn.shadow_map = function (option) {
    // this表示jQuery对象
    this.each(function () {
        //这里面的this表示dom对象
        $obj = $(this);//将遍历出来的DOM元素转换成jQuery对象

        //用参数
        for (var i = 0; i < option.slices; i++) {
            var $newobj = $obj.clone();
            $newobj.css({
                //offset（）方法offset() 方法设置或返回被选元素相对于文档的偏移坐标。
                position: "absolute",//脱离文档流，以body为父级
                left: $obj.offset().left + i,//按照$obj的坐标向右偏移i,
                top: $obj.offset().top + i,//按对于$obj的坐标向下偏移i
                opacity: option.opacity,
                zIndex: option.zIndex,
                margin: 0
            });
            $newobj.appendTo("body");
        }
    });
}
/**
 * 参数默认值
 * */
jQuery.fn.shadow_default = function (option) {
    //参数默认值
    var defaults = {
        slices: 5,
        opacity: 0.5,
        zIndex: -1
    }
    //将defaults与option进行合并
    var opts = $.extend(defaults, option);//将后面的参数往前面赋值。如果有重复的就覆盖

    // this表示jQuery对象
    this.each(function () {
        //这里面的this表示dom对象
        $obj = $(this);//将遍历出来的DOM元素转换成jQuery对象

        //用参数
        for (var i = 0; i < opts.slices; i++) {
            var $newobj = $obj.clone();
            $newobj.css({
                //offset（）方法offset() 方法设置或返回被选元素相对于文档的偏移坐标。
                position: "absolute",//脱离文档流，以body为父级
                left: $obj.offset().left + i,//按照$obj的坐标向右偏移i,
                top: $obj.offset().top + i,//按对于$obj的坐标向下偏移i
                opacity: opts.opacity,
                zIndex: opts.zIndex,
                margin: 0
            });
            $newobj.appendTo("body");
        }
    });
}
/**带回调函数的参数*/
jQuery.fn.shadow_callback = function (option) {
    //参数默认值
    var defaults = {
        slices: 5,
        opacity: 0.5,
        zIndex: -1,
        offset: function (i) {//回调函数
            var obj = {x: i, y: i};//x,y分别是下面的左右移动和上下移动
            // return {x:i,y:i};//return一个对象
            return obj;//return一个对象
        }
    }
    //将defaults与option进行合并
    var opts = $.extend(defaults, option);//将后面的参数往前面赋值。如果有重复的就覆盖
    // this表示jQuery对象
    this.each(function () {
        //这里面的this表示dom对象
        $obj = $(this);//将遍历出来的DOM元素转换成jQuery对象
        //用参数
        for (var i = 0; i < opts.slices; i++) {
            //获取回调函数
            var offset = opts.offset(i);
            $obj.clone().css({
                //offset（）方法offset() 方法设置或返回被选元素相对于文档的偏移坐标。
                position: "absolute",//脱离文档流，以body为父级
                left: $obj.offset().left + offset.x,//按照$obj的坐标向右偏移i,
                top: $obj.offset().top + offset.y,//按对于$obj的坐标向下偏移i
                opacity: opts.opacity,
                zIndex: opts.zIndex,
                margin: 0
            }).appendTo("body");
        }
    });
}


//定义参数（全局）
jQuery.fn.shadow.defaults = {
    slices: 5,
    opacity: 0.5,
    zIndex: -1,
    offset: function (i) {//回调函数
        var obj = {x: i, y: i};//x,y分别是下面的左右移动和上下移动
        // return {x:i,y:i};//return一个对象
        return obj;//return一个对象
    }
}
/**
 * 可定制的默认值
 * */
jQuery.fn.shadow_dingzhi = function (option) {
    //将defaults与option进行合并
    var opts = $.extend({}, jQuery.fn.shadow.defaults, option);//将后面的参数往前面赋值。如果有重复的就覆盖。jQuery.fn.shadow.defaults全局参数，上面定义的,一般全局是不想让你修改的，修改了可能会有影响，所以前面得加个{}
    // this表示jQuery对象
    this.each(function () {
        //这里面的this表示dom对象
        $obj = $(this);//将遍历出来的DOM元素转换成jQuery对象
        //用参数
        for (var i = 0; i < opts.slices; i++) {
            //获取回调函数
            var offset = opts.offset(i);
            $obj.clone().css({
                //offset（）方法offset() 方法设置或返回被选元素相对于文档的偏移坐标。
                position: "absolute",//脱离文档流，以body为父级
                left: $obj.offset().left + offset.x,//按照$obj的坐标向右偏移i,
                top: $obj.offset().top + offset.y,//按对于$obj的坐标向下偏移i
                opacity: opts.opacity,
                zIndex: opts.zIndex,
                margin: 0
            }).appendTo("body");
        }
    });
}