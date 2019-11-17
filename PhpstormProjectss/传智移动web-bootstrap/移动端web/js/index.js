// zepto库

window.onload = function () {
    // 1.顶部搜索
    search();
    // 2.轮播图
    banner();
    // 3.倒计时
    downTime();
};
var search = function () {
// 1、默认固定顶部透明背景
// 2、当页面滚动的时候--随着页面卷曲的高度变大透明度变大
// 3、当页面滚动的时候--超过某一个高度(轮播图高度)的时候透明度不变
    var searchBox = document.querySelector(".jd_search_box")
    var banner = document.querySelector(".jd_banner");
    var height = banner.offsetHeight;
    // 监听页面滚动事件
    window.onscroll = function () {
        // console.log(document.body.scrollTop);
        // console.log(document.documentElement.scrollTop);
        // console.log(window.pageYOffset);
        var scrollTop = document.documentElement.scrollTop;
        // console.log(scrollTop);
        //默认透明度
        var opacity = 0;
        if (scrollTop < height) {
            //  2、当页面滚动的时候--随着页面卷曲的高度变大透明度变大
            //x /0.85=  s/h    0.85为最大透明度
            opacity = scrollTop / height * 0.85
        } else {
            // 3、当页面滚动的时候--超过某一个高度(轮播图高度)的时候透明度不变
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201, 21, 35, ' + opacity + ')';

    }

};


var banner = function () {
    // 1.自动轮播且无缝            定时器，过度
    // 2.点要随着图片的轮播改变    根据索引切换
    //3.滑动效果                    利用touch事件完成
    //4.滑动结束的时候     如果滑动距离不超过屏幕的1/3 就吸附回去               过渡
    //5.当滑动结束的时候    如果滑动距离不超过屏幕的1/3 切换（上一张，下一张）  根据滑动的方向，过渡

    /*轮播图*/
    var banner = document.querySelector('.jd_banner');
    /*屏幕的宽度*/
    var width = banner.offsetWidth;
    /*图片容器*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点容器*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');

    var addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    };
    var removeTransition = function () {

        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    };
    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';

    };

    /*程序的核心 index*/
    var index = 1;
    var timer = setInterval(function () {
        index++;
        // 加过渡
        addTransition();
        // imageBox.style.transition = 'all 0.2s';
        // imageBox.style.webkitTransition = 'all 0.2s';
        // 做位移
        setTranslateX(-index * width)
        // imageBox.style.transform = 'translateX(' + (-index * width) + 'px)';
        // imageBox.style.webkitTransform = 'translateX(' + (-index * width) + 'px)';
    }, 1000);
    /*需要等最后一张动画结束去判断，是否瞬间定位到第一张*/
    imageBox.addEventListener('transitionend', function () {
        // console.log('ok');
        /*自动滚动的无缝*/
        if (index >= 9) {
            index = 1;
            /*瞬间定位*/
            /*清除过渡*/
            removeTransition(); //用方法包装这个过渡方法
            // imageBox.style.transition = 'none';
            // imageBox.style.webkitTransition = 'none';
            // /*做位移*/
            setTranslateX(-index * width);
            // imageBox.style.transform = 'translateX(' + (-index * width) + 'px)';
            // imageBox.style.webkitTransform = 'translateX(' + (-index * width) + 'px)';
            // console.log(index);
        }
        /*滑动的时候也需要无缝链接*/
        else if (index <= 0) {
            index = 8;
            /*瞬间定位*/
            /*清除过渡*/
            removeTransition();
            // imageBox.style.transition = 'none';
            // imageBox.style.webkitTransition = 'none';
            /*做位移*/
            setTranslateX(-index * width);
            // imageBox.style.transform = 'translateX(' + (-index * width) + 'px)';
            // imageBox.style.webkitTransform = 'translateX(' + (-index * width) + 'px)';
            // console.log(index);
        }

        /*根据索引设置点*/
        // 08同一张图 19同一张图
        /*此时此刻  index 的取值范围：1-8 （0，8 --- 1，9） */
        /*点索引 index-1   0-7*/
        setPoint();

    });

    /*设置点的方法*/
    var setPoint = function () {
        // index 1-8
        /*点索引 index-1   0-7*/
        // 清除样式
        for (var i = 0; i < points.length; i++) {
            var obj = points[i];
            obj.classList.remove('now');
        }
        // 给对应的加上样式
        points[index - 1].classList.add("now");
    };


    // 绑定事件
    var startX = 0;
    var distanceX = 0;
    var isMove = false; //判断用户是点了一下 还是移动了
    imageBox.addEventListener("touchstart", function (e) {
        /*清除定时器*/
        clearInterval(timer);
        // 记录起始位置的x坐标
        startX = e.touches[0].clientX;

    });
    imageBox.addEventListener("touchmove", function (e) {
        //记录滑动过程当中的x坐标
        var moveX = e.touches[0].clientX;
        /*计算位移  由正负方向*/
        distanceX = moveX - startX;
        /*计算目标元素的位移 不用管正负*/
        /*元素将要的定位等于当前定位+手指移动的距离*/
        var translateX = -index * width + distanceX;
        /*滑动 -->  让触摸的元素随着手指的滑动做位置的改变*/
        removeTransition();
        setTranslateX(translateX);
        isMove = true;

    });
    imageBox.addEventListener("touchend", function (e) {
            /*4 5  实现*/
            //4.滑动结束的时候     如果滑动距离不超过屏幕的1/3 就吸附回去               过渡
            //5.当滑动结束的时候    如果滑动距离不超过屏幕的1/3 切换（上一张，下一张）  根据滑动的方向，过渡
            /*要使用移动的距离*/
            if (isMove) {
                // abs() 方法可返回数的绝对值。
                if (Math.abs(distanceX) < width / 3) {
                    /*吸附回去*/
                    addTransition();
                    setTranslateX(-index * width);
                } else {
                    /*切换*/
                    if (distanceX > 0) {
                        /*右滑动  上一张*/
                        index--;
                    } else {
                        /*左滑动  下一张*/
                        index++;
                    }
                    /*根据index去动画的移动*/
                    addTransition();
                    setTranslateX(-index * width);
                }
                /*每次完成最好做一次参数的重置*/
                startX = 0;
                distanceX = 0;
                isMove = false;

                /*加上定时器*/
                clearInterval(timer);//为了严谨防止多次加上
                timer = setInterval(function () {
                    index++;
                    // 加过渡
                    addTransition();
                    // imageBox.style.transition = 'all 0.2s';
                    // imageBox.style.webkitTransition = 'all 0.2s';
                    // 做位移
                    setTranslateX(-index * width)
                    // imageBox.style.transform = 'translateX(' + (-index * width) + 'px)';
                    // imageBox.style.webkitTransform = 'translateX(' + (-index * width) + 'px)';
                }, 1000);
            }
        }
    );


};

var downTime = function () {

    /*倒计时的事件*/
    var time = 2 * 60 * 60; //2小时
    /*每一秒去更新我们显示的时间*/
    var timer = setInterval(function () {
        time--;
        /*时间盒子*/
        var spans = document.querySelector('.sk_time').querySelectorAll('span');
        /*格式还是秒  转换*/
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = time % 60;

        spans[0].innerHTML = Math.floor(h / 10);
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = Math.floor(m / 10);
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = Math.floor(s / 10);
        spans[7].innerHTML = s % 10;

        if (time <= 0) {
            clearInterval(timer);
        }

    }, 1000);
};