$(function () {

    /*1.一级分类默认渲染 第一个一级分类对应的二级分类*/
    getFirstCategoryData(function (data) {
        /*一级分类默认渲染*/
        /*模版的使用顺序：json数据,定义模版，调用模版，返回html*/
        $('.cate_left ul').html(template('firstTemplate', data));
        /*绑定事件*/
        // initSecondTapHandle();

        /*第一个一级分类对应的二级分类*/
        var categoryId = $('.cate_left ul li:first-child').find('a').attr('data-id');
        /*  getSecondCategoryData({
              id: categoryId
          }, function (data) {
              //二级分类默认
              $('.cate_right ul').html(template('secondTemplate', data));
          });*/
        // render($('.cate_left ul li:first-child').find('a').attr('data-id'));
        render(categoryId);
    });


    /*2.点击一级分类加载对应的二级分类*/
    //方法一
    // var initSecondTapHandle = function () {
    //     $('.cate_left ul li a').on('tap',function () {
    //         console.log('tap')
    //     })
    // }
    //方法二：如果不确定里面是动态渲染的 可以用这个方法
    $('.cate_left').on('tap', 'a', function (e) {
        /*当前选中的时候不去加载*/
        if ($(this).parent().hasClass('now')) return false;
        /*样式选中功能*/
        $('.cate_left li').removeClass('now');
        $(this).parent().addClass('now');//现在是a  父级是对应的li
        var categoryId = $(this).attr('data-id');
        // console.log(categoryId);

        /*由于上面也在用 ，就封装成了一个方法渲染 render
        getSecondCategoryData({
             id:categoryId
         },function (data) {
             $('.cate_right ul').html(template('secondTemplate',data));
         })*/

        /*数据的渲染*/
        // render($(this).attr('data-id'));
        render(categoryId);
    })


});
/*获取一级分类的数据*/
var getFirstCategoryData = function (callback) {
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        data: '',//参数
        dataType: 'json',
        success: function (data) {//服务器返回的数据
            callback && callback(data);
        }
    });
};
/*获取二级分类的数据*/
/*params={id:1}*/
var getSecondCategoryData = function (params, callback) {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data: params,//参数
        dataType: 'json',
        success: function (data) {//服务器返回的数据
            callback && callback(data);
        }
    });
};
/*渲染*/
var render = function (categoryId) {
    getSecondCategoryData({
        id: categoryId
    }, function (data) {
        /*二级分类默认*/
        $('.cate_right ul').html(template('secondTemplate', data));
    });
}

