$(function () {
    //ajax异步  就是入口函数在执行的时候 ajax也在执行两者互不相关， 但可以改成同步的，就是等ajax请求成功data后再执行入口函数（用async）
    banner();
    /*移动端页签*/
    initMobileTab();
    /*初始化工具提示*/
    $('[data-toggle="tooltip"]').tooltip();

});

var banner = function () {
    /*动态轮播图*/
    /*1.    获取轮播图数据     ajax */
    /*2.    根据数据动态渲染 根据当前设备 屏幕宽度判断 */
    /*2.1   准备数据*/
    /*2.2   把数据转换成html格式字符串 (动态创建元素，字符串拼接，模版引擎【artTemplate】)*/
    /*2.3   把字符串渲染页面当中*/
    /*3.    测试功能：监听页面尺寸发生改变重新渲染*/
    /*4.    移动端手势切换 touch*/


    /*ui框架：bootstrap,妹子UI,jqueryUI,easyUI,jqueryMobile,mui,framework7*/
    /*关于移动端的UI框架：bootstrap,jqueryMobile,mui,framework7*/
    /*模板引擎：artTemplate,handlebars,mustache,baiduTemplate,velocity,underscore*/


    /*做数据缓存*/
    var getData = function (callback) {//callback方法再下面的render方法里面得getData方法里面的匿名函数
        /*缓存了数据*/
        if (window.data) {//如果data数据存在就直接渲染
            // render();
            callback && callback(window.data);
        } else {
            /*最开始没有数据*/
            /*1.    获取轮播图数据     ajax */
            $.ajax({
                type: 'get',
                url: 'js/data.json',//相对路径
                // async:false,/*设置同步请求 默认false*/
                /*强制转换后台返回的数据为json对象  后台如果传来的不是json数据(比如多个逗号啥的)，强制转为json 就会报错*/
                /*强制转换不成功程序报错，不会执行success，执行err回调*/
                dataType: 'json',
                data: '',
                success: function (data) {
                    // console.log(data)
                    window.data = data;//定义了个全局变量data 把第一次请求成功的数据缓存下来
                    callback && callback(window.data);
                    /*这里和同步一个意思，等数据请求得到后再执行callback*/
                }
            });
        }

    };
    var render = function () {
        getData(function (data) {//这个方法就是callback
            /*2.    根据数据动态渲染 根据当前设备(要么移动端要么pc端) 屏幕宽度判断 */
            // var isMobile = $(window).width() < 768 ? true : false;//方便理解
            var isMobile = $(window).width() < 768;//比较的返回值本来就是true和false
            // console.log(isMobile)
            // console.log(data);
            /*2.1   准备数据 上面搞定了（data）*/


            /*2.2   把数据转换成html格式字符串 (动态创建元素，字符串拼接，模版引擎【artTemplate】)*/
            /*使用模板引擎：哪些html静态内容需要编程动态的*/
            /*发现：点容器 图片容器  新建模板*/
            /*开始使用*/
            // <%console.log(list);%>模板引擎内不可使用外部变量
            var pointHtml = template('pointTemplate', {list: data});//list随便取名
            // console.log(pointHtml);
            var imageHtml = template('imageTemplate', {list: data, isM: isMobile});//list随便取名
            // console.log(imageHtml);
            /*2.3   把字符串渲染页面当中*/
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        })

    };
    /*
    //方法一：
    render();//第一次初始化
    //3.    测试功能：监听页面尺寸发生改变重新渲染
    $(window).on('resize', function () {
         render();
   })
*/

    //方法二：
    /*3.测试功能 页面尺寸发生改变事件*/
    $(window).on('resize', function () {
        render();
        /*trigger：通过js主动触发某个事件*/
        //eg: $('body').trigger('click');//在body里面随便点击一处 就会触发click事件,并打印click
        //同
        //$('body').on('click',function(){console.log('click')})//在body里面随便点击一处 就会触发click事件,并打印click
    }).trigger('resize');


    /*4.    移动端手势切换 touch*/
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    /*originalEvent代表原生js事件*/
    $('.wjs_banner').on('touchstart', function (e) {
        // console.log(e);//和原生的event对象不一样
        //    console.log(e.originalEvent);//originalEvent代表原生js事件
        startX = e.originalEvent.touches[0].clientX;

    }).on('touchmove', function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend', function (e) {
        /*距离足够 50px  一定要滑动过*/
        if (isMove && Math.abs(distanceX) > 50) {
            /*手势*/
            /*左滑手势*/
            if (distanceX < 0) {
                // console.log('next')
                $('.carousel ').carousel('next')//bootstrap文档里面的
            }
            /*右滑手势*/
            else {
                // console.log('prev')
                $('.carousel ').carousel('prev')
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;
    })
};
var initMobileTab = function () {
    /*1.解决换行问题*/
    var $navTabs = $(".wjs_product .nav-tabs");
    var width = 0;
    $navTabs.find('li').each(function (i, item) {
        var $currLi = $(this);//$(item);
        /*
        *4种获取宽度的方式
        * width()  内容
        * innerWidth()  内容+内边距
        * outerWidth()  内容+内边距+边框
        * outerWidth(true)  内容+内边距+边框+外边距
        *
        * */


        var liWidth = $currLi.outerWidth(true);
        width += liWidth;
    });
    console.log(width);
    $navTabs.width(width);
    /*2.修改结构，使之区域滑动的结构*/
    //加了一个父容器(.nav-tabs-parent)给 .nav-tabs


    /*3.自己实现滑动效果 或者 使用iscroll */
    //拿到父容器 并转为dom对象
    new IScroll($('.nav-tabs-parent')[0], {
        scrollX: true,
        scrollY: false,
        click:true
    })
}