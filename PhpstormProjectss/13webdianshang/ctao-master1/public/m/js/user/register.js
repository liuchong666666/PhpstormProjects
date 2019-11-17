$(function () {
    $('body').on('tap', '.btn_register', function () {
        if(window.loading)return false;//如果验证码错误  就不提交注册
        // username|是|用户名 password|是|用户密码 mobile|是|用户手机号 vCode|是|验证码
        var data = {
            username: $.trim($('[name="username"]').val()),
            password: $.trim($('[name="password"]').val()),
            rePassword: $.trim($('[name="rePassword"]').val()),
            mobile: $.trim($('[name="mobile"]').val()),
            vCode: $.trim($('[name="code"]').val())
        };
        if (!data.username) {
            mui.toast('请输入用户名');
            return false;
        }
        if (!data.mobile) {
            mui.toast('请输入手机号');
            return false;
        }

        if (!/^1\d{10}$/.test(data.mobile)) {
            mui.toast('请输入合法手机号');
            return false;
        }
        if (!data.password) {
            mui.toast('请输入密码');
            return false;
        }

        if (!data.rePassword) {
            mui.toast('请再次输入密码');
            return false;
        }
        else if (data.password != data.rePassword) {
            mui.toast('两次密码不一致');
            return false;
        }
        if (!data.vCode) {
            mui.toast('请输入验证码');
            return false;
        }
        else if (!/^\d{6}$/.test(data.vCode)) {
            mui.toast('请输入合法验证码');
            return false;
        }
        $.ajax({
            type:'post',
            url:'/user/register',
            data:data,
            dataType:'json',
            beforeSend:function(){
                window.loading = 1;
                $('.btn_register').html('正在提交...');
            },
            success:function(data){
                window.loading = null;
                if(data.success){
                    mui.toast('注册成功！');
                    location.href=CT.loginUrl;
                }else{
                    mui.toast(data.message);
                    $('.btn_register').html('注册');
                }
            }
        });

    }).on('tap', '.btn_getCode', function () {
        var btn = $('.btn_getCode');
        //获取验证码之前先验证手机号
        var data = {mobile: $.trim($('[name="mobile"]').val())};
        if (!data.mobile) {
            mui.toast('请输入手机号');
            return false;
        }
        if (!/^1\d{10}$/.test(data.mobile)) {
            mui.toast('请输入合法手机号');
            return false;
        }
        if(btn.hasClass('btn_disabled')) return false;
        CT.loginAjax({
            type: 'get',
            url: '/user/vCode',
            data: '',
            dataType: 'json',
            beforeSend: function () {
                btn.addClass('btn_disabled').html('发送中...')
            },
            success: function (data) {
                console.log(data.vCode);
                //定时器
                var time = 60;
                var timer = setInterval(function () {
                    btn.addClass('btn_disabled');
                    time--;
                    btn.html(time + "s后再获取");
                    if (time <= 0) {
                        clearInterval(timer);
                        btn.removeClass('btn_disabled').html('获取认证码');
                    }
                }, 1000);

            }
        })
    })
})