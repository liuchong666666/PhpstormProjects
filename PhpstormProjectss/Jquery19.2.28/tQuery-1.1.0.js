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
    else if (selector.indexOf("<") == 0 && selector.lastIndexOf(">") == selector.length - 1) {


// $("<div>hello world</div>"):创建新元素,弊端：标签里面套标签就不完整了，暂时不考虑这个
// 思路;
// 1、判断是否为HTML标签:通过前尖括号和最后的尖括号<   >
//     以 <开始  以>结束：
//     indexOf("<") == 0
//     lastIndexOf(">") == selector.length-1//最后一个>符号
//     //如果是indexOf(">") == selector.length-1//则是第一个>符号，这里要找最后一个所以用上面的
// 2、提取标签名称
//     $("<div>"),只需要div    长度用indexOf(">"),js的indexof不包括后面；
//     substring( 索引，长度) substring(1,4);//从第一个字符开始
        var elemName = selector.substring(1, selector.indexOf(">"));
        // console.log(elemName);
// 3、document.createElement("div");
        var newElem = document.createElement(elemName);//createElement() 方法通过指定名称创建一个元素
        // console.log(newElem);
// 4、封装标签内容：innerHTML=
        //截取 >    < 之间的内容 indexOf(">")   lastIndexOf("<")
        var content = selector.substring(selector.indexOf(">") + 1, selector.lastIndexOf("<"));
        // console.log(content);
        newElem.innerHTML = content;

// 5、将元素封装到TQobject中
        this.tqObject.data.push(newElem);

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
    append: function (tqObject) {
        //将tqObject里面的所有元素增加到this里面的第一个元素里
        //$("body").append($('<div>Hello Tarena</div>'));
        for (var i = 0; i < this.data.length; i++) {
            var srcElem = this.data[i];//this.data[0];是上面选择器中的数据，也就是$("body")
            // console.log("源srcElem:");
            // console.log(srcElem);
            for (var j = 0; j < tqObject.data.length; j++) {
                // var tarElem = tqObject.data[j];
                // console.log(tqObject.data[j]);
                // tqObject.data[j].getElementsByTagName();
                // console.log("tqObject.data[j].tagName:");
                // console.log(tqObject.data[j].tagName);//获得了后面的标签名，然后创建
                // console.log(tqObject.data[j].className);//获取class
                // console.log(tqObject.data[j].id);//获取id
                var tag = tqObject.data[j].tagName;
                var cla = tqObject.data[j].className;
                var id = tqObject.data[j].id;
                var text = tqObject.data[j].innerHTML;
                // 创建标签
                var createElem = document.createElement(tag);
                //设置标签的class id innerhtml
                createElem.className = cla;
                createElem.id = id;
                createElem.innerHTML = text;
                console.log(createElem);
                // console.log(tqObject.data[j].tagName);
                // console.log("tqObject.data[j]:");
                // console.log(tarElem);
                //  console.log("tarElem:");
                //  console.log(tarElem);
                //将创建好的标签插入到源元素中
                srcElem.appendChild(createElem);//appendChild() 方法可向节点的子节点列表的末尾添加新的子节点。
                tqObject.data[j].remove();
            }
        }
        return this;
    },
    appendTo: function (tqObject) {
        // $("<div>Hello World</div>").appendTo($("body"));
        //tqObject为源元素
        //this为目标元素
        //将this中的第一个元素，追加到tqObject的第一个元素中去
        for (var i = 0; i < tqObject.data.length; i++) {
            var srcElem = tqObject.data[i];
            var tarElem = this.data[i];//this.data[0];是上面选择器中的数据，也就是$("body")
            srcElem.appendChild(tarElem);
        }
        return this;
    },
    insertBefore: function (tqObject) {
        //$("a").insertBefore(b); b是新  a是旧  先找b   再找a
        //DOM:parentNode.insertBefore(newElem,oldElem); 在父节点中，将新标签插入到旧标签后面
        //先找到新标签，旧标签，父节点
        //newElem
        for (var i = 0; i < tqObject.data.length; i++) {
            var newElem = this.data[i];
            //oldElem
            var oldElem = tqObject.data[i];
            //parentElem
            var parentElem = oldElem.parentNode;

            parentElem.insertBefore(newElem, oldElem);
        }
        return this;
    },
    remove: function () {
        for (var i = 0; i < this.data.length; i++) {
            // $("#myDiv").remove();
            // DOM : parentNode.removeChild(removeElem);
            //被移除的元素 this.data[0]
            var removeElem = this.data[i];
            //获取被移除元素的父元素
            var parentElem = removeElem.parentNode;

            parentElem.removeChild(removeElem);
            //不能return this；因为被删除了就没了
        }
    },
    /*hide: function () {
        // $("myDiv").hide();
        for (var i = 0; i < this.data.length; i++) {

            this.data[i].className = "hiden";
        }
    },
    show: function () {
        for (var i = 0; i < this.data.length; i++) {

            this.data[i].className = "show";
        }
    },*/
    slideUp: function (speed) {
        /*   开始给固定的L， height -= L；L=7
        //1.获取元素高度
          var elem = this.data[0];
          //var h=elem.style.height;//获取行内样式，    内联内嵌、外部不行
          // console.log(h);
          var height = elem.offsetHeight;
          var oldheight = height;// 保存原始高度
          //修改高度
          var interval = setInterval(function () {
              //更新高度（递减）
              height -= 7;// height -= L；
              elem.style.height = height + "px";
              // console.log(elem.style.height);
              //判断高度是否达到0
              if (height <= 0) {//elem.offsetHeight始终不得小于0，所以不能用这个判断
                  //将原始高度复制给当前的隐藏元素
                  elem.style.display = "none";
                  elem.style.height = oldheight + "px";
                  // console.log(elem.style.height);
                  clearInterval(interval);
              }
          }, 30);
          */
        //1.获取元素高度
        var elem = this.data[0];
        // var h=elem.style.height;//获取行内样式，    内联内嵌、外部不行
        var height = elem.offsetHeight;//获取的高度没有px
        var oldheight = height;// 保存原始高度
        //判断是否有自定义的speed，默认的执行完成时间
        var s = speed || 300;//意思就是如果有speed就赋值speed给s，如果没有就赋值300给s，speed必须写前面，因为300是肯定存在的，先判断speed存在不
        // console.log(s);
        var L;//步长，每步增加多少，然后计算这个L，等比
        //L/height =30/s  （s为执行的完成总时间,30为30毫秒执行一次函数那个）
        L = 30 / s * height;
        // console.log(speed, L);

        //修改高度
        var interval = setInterval(function () {
            //更新高度（递减）
            height -= L;
            elem.style.height = height + "px";
            // console.log(elem.style.height);
            //判断高度是否达到0
            if (height <= 0) {//elem.offsetHeight始终不得小于0，所以不能用这个判断
                //将原始高度复制给当前的隐藏元素
                elem.style.display = "none";
                elem.style.height = oldheight + "px";
                // console.log(elem.style.height);
                clearInterval(interval);
            }
        }, 30);
    },
    slideDown: function (speed) {
        var elem = this.data[0];
        var height = parseInt(elem.style.height);//获取slideup中的原始高度,并用parseInt去掉px
        console.log(elem.style.height);//500px
        console.log(elem.offsetHeight);//0
        elem.style.height = 0 + "px";//将高度改为0，从0变到height（slideup中的原始高度）
        console.log(elem.offsetHeight);//0
        elem.style.display = "block";
        var s = speed || 300;
        var L = 30 / s * height;
        // console.log(height);
        var interval = setInterval(function () {
            elem.style.height = (elem.offsetHeight + L) + "px";
            console.log(elem.offsetHeight);//
            // console.log(elem.style.height);
            if (elem.offsetHeight >= height) {//直到达到原始高度，就停止
                clearInterval(interval);
                elem.style.height = height + "px";//赋给原始高度值
                // console.log(elem.style.height);
            }
        }, 30)
    },
    hide: function (speed) {
        //宽度高度同时收缩隐藏
        //1.先获取原始高度宽度
        var elem = this.data[0];
        var height = elem.offsetHeight;//获取的高度没有px
        var width = elem.offsetWidth;

        //用户指定完成的总时间speed，若不指定就为默认的300
        var s = speed || 300;
        //指定宽度的步长为H
        //指定宽度的步长为W
        //L/height =30/s  （s为执行的完成总时间,30为30毫秒执行一次函数那个）
        var H = 30 / s * height;
        var W = 30 / s * width;

        var oldheight = height;
        var oldwidth = width;
        //2.计时修改原始高度
        var interval = setInterval(function () {
            height -= H;
            width -= W;

            elem.style.height = height + "px";
            elem.style.width = width + "px";
            if (elem.offsetHeight <= 0 || elem.offsetWidth <= 0) {

                // 2.1修改完后，将其隐藏
                elem.style.display = "none";
                // 2.2将原始高度宽度赋值给修改完的高度宽度
                elem.style.height = oldheight + "px";
                elem.style.width = oldwidth + "px";
                // console.log(elem.style.height, elem.style.width);
                clearInterval(interval);
            }
        }, 30)

    },
    show: function (speed) {
        //1.获取原始高宽
        var elem = this.data[0];
        var height = parseInt(elem.style.height);//这个带有像素px,所以得先去掉px,只保留数值. 也可以不用去，1.1步就不用加px
        var width = parseInt(elem.style.width);

        //用户输入的speed持续总时间，没输入就默认300
        var s = speed || 300;
        //步长
        //L/height =30/s  （L为步长，s为执行的完成总时间,30为30毫秒执行一次函数那个）
        var H = 30 / s * height;
        var W = 30 / s * width;

        // 1.1将style.高宽改为0，从0开始到原始高宽
        elem.style.height = 0 + "px";
        elem.style.width = 0 + "px";
        // 2.1并且dispaly改为显示
        elem.style.display = "block";
        //2.计时增加高宽
        console.log(parseInt(elem.style.height), parseInt(elem.style.width));
        var interval = setInterval(function () {
            elem.style.height = (elem.offsetHeight + H) + "px";
            elem.style.width = (elem.offsetWidth + W) + "px";
            9
            // console.log(elem.style.height, elem.style.width);
            if (elem.offsetHeight >= height || elem.offsetWidth >= width) {
                // 2.2将原始高宽赋值给style.高宽
                elem.style.height = height + "px";
                elem.style.width = width + "px";
                clearInterval(interval);
            }

        }, 30)


    },
    fadeOut: function () {
        //透明度相关的显示隐       $("").fadeOut() 隐藏   透明度属性opacity:0.8
        var elem = this.data[0];
        //1.设置源元素的透明度     elem.style.opacity="0.1";
        //初始
        var oldop = 100;
        elem.style.opacity = oldop / 100;
        //用来修改的
        var newop = 100;
        //2.然后计时修改透明度
        var interval = setInterval(function () {
            newop -= 0.5;
            elem.style.opacity = newop / 100;
            if (newop <= 0) {
                elem.style.display = "none";
                //3.将原始透明度赋值给元素
                elem.style.opacity = oldop / 100;
                clearInterval(interval);
            }
        })

    },
    fadeIn: function () {
        // $("").fadeIn() 显示
        var elem = this.data[0];
        //1.获取原始透明度
        var opa = elem.style.opacity;
        //2.将透明度改为0 从0变到原始透明度,并设置为显示display:block
        elem.style.opacity = 0;
        // elem.style.display = "block";
        var op = 0;
        //2.1计时修改
        var interval = setInterval(function () {
            op += 0.1;
            elem.style.display = "block";
            elem.style.opacity = op / 100;
            if (op / 100 >= opa) {
                clearInterval(interval);
                //2.2将原始透明度赋值
                elem.style.opacity = opa;
                console.log(elem.style.opacity);
            }
        })


    },
    bind: function (eventName, fn) {
        // 3、事件绑定
        // $("").bind("click",fn);
        for (var i = 0; i < this.data.length; i++) {
            var elem = this.data[i];
            elem.addEventListener(eventName, fn, false);
        }
    }

}


