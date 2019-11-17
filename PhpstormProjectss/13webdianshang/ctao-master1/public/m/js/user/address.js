$(function () {
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
    //渲染页面
    var render = function () {
        getUserAddress(function (data) {
            $('.mui-scroll').html(template('list', {model: data}));
            /*滑动删除*/
            $('.address_ul').on('tap', '.mui-btn', function (event) {
                // var $li = elem.parent().parent();
                var li = this.parentNode.parentNode;
                var $this = $(this);
                id=$(this).attr('data-id');
                mui.confirm('确认删除该条记录？', 'Hello MUI', ['确认', '取消'], function (e) {
                    if (e.index == 0) {
                        deleteAddress(id,function(){
                            mui.toast('删除成功！');
                            getUserAddress(function(data){
                                render();
                            });
                        });
                        $this.parent().parent().remove();
                    } else {
                        setTimeout(function () {
                            mui.swipeoutClose(li);
                        }, 0);
                    }
                });
            });
        });
    };
    render();


});
//获取收件人地址列表
var getUserAddress = function (callback) {
    CT.loginAjax({
        type: 'get',
        url: '/address/queryAddress',
        data: '',
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        },
        error: function () {
            mui.toast('服务器故障，请联系管理员qq:1286533039');
        }
    })
};
var deleteAddress = function (id, callback) {
    CT.loginAjax({
        type: 'post',
        url: '/address/deleteAddress',
        data: {id: id},
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
};