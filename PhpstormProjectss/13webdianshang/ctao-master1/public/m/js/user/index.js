$(function () {
    /*区域滚动*/
    mui('.mui-scroll-wrapper').scroll({
        indicators:false
    });
    /*轮播图*/
    mui('.mui-slider').slider({
        interval:2000,

    });

    getUserMessage(function (data) {
        $('.username_phone').find('span').eq(0).html(data.username||'暂无');
        $('.username_phone').find('span').eq(1).html(data.mobile);
    });
    $('body').on('tap','.btn_outLogin',function () {
        // /user/logout
        var btn = $('.btn_outLogin');
        $.ajax({
            type:'get',
            url:'/user/logout',
            data:'',
            dataType:'',
            beforeSend:function () {
                btn.html('正在退出...');
            },
            success:function (data) {
                if(data.success==true){
                    btn.html('退出登录');
                    location.href=CT.loginUrl;
                }else{
                    mui.toast(data.message);
                    btn.html('退出登录');
                }
            }
        })
    })
});
//查询个人信息
var getUserMessage= function (callback) {
    CT.loginAjax({
        type:'get',
        url:'/user/queryUserMessage',
        data:'',
        dataType:'json',
        success:function (data) {
            callback&&callback(data);
        }
    })
}