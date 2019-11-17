$(function () {
    $('body').on('tap', '.btn_updatePass', function () {
        if (window.lodaing) return false;
        var btn = $('.btn_updatePass');
        var data = {
            oldPassword: $.trim($('[name="oldPassword"]').val()),
            newPassword: $.trim($('[name="newPassword"]').val()),
            reNewPassword: $.trim($('[name="reNewPassword"]').val()),
            vCode: $.trim($('[name="code"]').val()),
        };
        if (!data.oldPassword) {
            mui.toast('请输入旧密码');
            return false;
        }
        if (!data.newPassword) {
            mui.toast('请输入新密码');
            return false;
        }

        if (!data.reNewPassword) {
            mui.toast('请再次输入新密码');
            return false;
        }
        else if (data.newPassword != data.reNewPassword) {
            mui.toast('两次新密码不一致');
            return false;
        }
        if (!data.vCode) {
            mui.toast('请输入认证码');
            return false;
        }
        else if (!/^\d{6}$/.test(data.vCode)) {
            mui.toast('请输入合法认证码');
            return false;
        }
        CT.loginAjax({
            type:'post',
            url:'/user/updatePassword',
            data: data,
            dataType:'json',
            beforeSend:function () {
                window.loading=1;
                btn.html('正在修改中');
            },
            success:function (data) {
                if(data.success==true){
                    window.loading=null;
                    btn.html('确认修改');
                    mui.toast('修改成功');
                    location.href=CT.loginUrl;
                }else{
                    btn.html('确认修改');
                    mui.toast(data.message);
                }
            },
            error:function () {
                mui.toast('服务器繁忙')
            }
        })
    }).on('tap', '.btn_getCode', function () {
        var btn = $('.btn_getCode');
        if(btn.hasClass('btn_disabled'))return false;
        CT.loginAjax({
            type: 'get',
            url: '/user/vCodeForUpdatePassword',
            data: '',
            dataType: 'json',
            beforeSend: function () {
                btn.addClass('btn_disabled').html('发送中');
            },
            success: function (data) {
                // if(data.sucees){
                //     mui.toast('修改成功');
                //     location.href=CT.loginUrl;
                // }else{
                //     mui.toast(data.message);
                // }
                console.log(data.vCode);
                var time = 60;
                var timer= setInterval(function () {
                    time--;
                    btn.html(time+'s后再获取');
                    if(time<=0){
                        clearInterval(timer);
                        btn.removeClass('btn_disabled').html('获取认证码');
                    }
                },1000);


            }
        })
    })
});