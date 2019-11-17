/**
 获取界面元素
 selector:选择器：可以是类，id，标记
 */

var $ = function (selector) {
    this.tqObject = new TQobject();
    if (selector.substring(0, 1) == "#") {
        // var reg=new RegExp("(^|\\s)"+ /,./+"($|\\s)");
        // var elems = document.getElementsByTagName("*");//这里是获取所有标签！
        // for (var i = 0; i < elems.length; i++) {
        //     if (reg.test(elems[i].className+",")) {
        //         this.tqObject.data.push(elems[i]);
        //     }else{
        //         var elem = document.getElementById(selector.substring(1, selector.length));
        //     }
        // }
        var elem = document.getElementById(selector.substring(1, selector.length));//getElementById() 方法可返回对拥有指定 ID 的第一个对象的引用。
        this.tqObject.data.push(elem);
    } else if (selector.substring(0, 1) == ".") {
//类选择器的操作
        //判断浏览器是否支持getElementsClassName
        var className = selector.substring(1);
        if (document.getElemnetsByClassName) {
            return document.getElemnetsByClassName(className);
            this.tqObject.data.push(document.getElemnetsByClassName(className));//document.getElementByclassName（）方法;使用指定的calss属性值返回相关元素的集合(节点列表)，兼容性
        } else {//判断浏览器这一步（if里面）可以不用要，直接用else里面的就可以
            var reg = new RegExp("(^|\\s)" + selector.substring(1, selector.length) + "($|\\s)");
            var elems = document.getElementsByTagName("*");//这里是获取所有标签！getElementsByTagName() 方法可返回带有指定标签名的对象的集合。
            for (var i = 0; i < elems.length; i++) {
                if (reg.test(elems[i].className)) {
                    this.tqObject.data.push(elems[i]);
                }
            }
        }
    }
    else {
//标记选择器

        var elems = document.getElementsByTagName(selector);//getElementsByTagName() 方法可返回带有指定标签名的对象的集合。
        this.tqObject.data = elems;
        // this.tqObject.data.push(elems);
    }
    return this.tqObject;
}

/**
 封装TQobject对象，提供一个数组元素，以及若干自定义的操作方法

 封装选择器
 通过封装$("#id|.class|element")来获取元素
 */

/**
 封装TQobject
 */

var TQobject = function () {
    this.data = [];
}
TQobject.prototype = {
    //给原型里面加方法
    size: function () {
        return this.data.length;
    },
    //对innerHTML的封装
    html: function (content) {
        if (content) {
            //为元素设置html值（xx.innerHTML=""）
            for (var i = 0; i < this.data.length; i++) {
                this.data[i].innerHTML = content;//返回自己
            }
            return this;//返回自己，从而实现方法的连缀调用
        }
        else {
            //如果没有参数
            //获取html值（reuturn xx.innerHTML）
            if (this.data.length != 0) {
                return this.data[0].innerHTML;// 返回第一个，字符串
            }
            return;//可以往里头灵活加东西
        }

    },
    //对text（）方法封装:
    //对innerText属性进行封装
    //注意：兼容性问题，FireFox Textcontent
    //返回浏览器信息: window.navigator.userAgent
    text: function (content) {
        if (content) {//如果有参数
            for (var i = 0; i < this.data.length; i++) {
                this.data[i].innerText = content;
            }
            return this;
        } else {//如果没有参数
            return this.data[0].innerText;
        }
        return;
    },
    // val([value])方法:[value]中括号表示可有可无
    // 主要针对有value属性的标签
    val: function (value) {
        if (value) {
            //为value属性设置值
            for (var i = 0; i < this.data.length; i++) {
                this.data[i].setAttribute("value", value);//第一种：
                // this.data[i].value=value;//第二种
            }
            return this;
        }
        else {
            //取值
            if (this.data.length != 0) {
                return this.data[0].value;//第一种：不管value有没有值都可以
                // return this.data[0].getAttribute("value"); //第二种,这种必须value已经有值了才行
            }
        }
    },
    //attr(name[,value])方法
    //attr("id"):获取ID值
    //attr("value","hello world"):设置某一标签的value为hello world
    attr: function (name, value) {
        if (name && value) {//或者用argument判断是否有两个参数
            //设置
            for (var i = 0; i < this.data.length; i++) {
                this.data[i].setAttribute(name, value);
            }
            return this;
        } else if (name) {
            //获取
            if (this.data.length != 0) {
                return this.data[0].getAttribute(name);
            }
        }
    },
    //addClass(className)方法
    //为某一个（一组）元素，追加className样式
    /*
    <div class="red"></div>
     $(".red").addClass("bigFont");
     */
    addClass: function (className) {
        for (var i = 0; i < this.data.length; i++) {
            var elem = this.data[i];
            if (elem.getAttribute("class")) {
                //如果已经有了class属性
                var oldclassname = elem.getAttribute("class");
                var newclassname = oldclassname + " " + className;//代表样式
                elem.setAttribute("class", newclassname);
            } else {
                //如果没有class属性，就加一个
                elem.setAttribute("class", className);
            }
        }
        return this;
    },
    // removeClass([className]);
    // removeClass(className)：移除指定样式
    // removeClass():移除所有样式
    removeClass: function (className) {
        if (className) {
            //删除指定样式
            //<input class="a a1 b c">
            //移除a1后   "a b c" 注意有空格
            for (var j = 0; j < this.data.length; j++) {
                var arr = this.data[j].getAttribute("class").split(" ");//得到的数据用空格拆分
                // alert(arr);
                var newclassName = "";
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == className) {//className指定的样式取出来不做处理，然后剩下的拼凑一起用空格再赋给html标签
                        continue;
                    }
                    newclassName += arr[i] + " ";
                }
                newclassName = newclassName.substring(0, newclassName.length - 1);
                this.data[j].setAttribute("class", newclassName);
            }
            return this;
        }
        else {
            //移除所有样式
            for (var i = 0; i < this.data.length; i++) {
                this.data[i].setAttribute("class", "");
            }
        }
    },
    $:function (text) {
        for(var i=0;i<this.data.length;i++){
            this.data[i].innerHTML=text;
        }
        return this;
    }
}

