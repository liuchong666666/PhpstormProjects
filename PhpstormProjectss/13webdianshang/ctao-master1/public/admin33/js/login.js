$(function () {
    /*初始化校验插件*/
    //1.是form表单结构 并且有一个提交按钮
    //2.这个插件就是jQuery插件 样式和bootstrap风格一致
    $('#login').bootstrapValidator({
        // message:''//默认没有错误提示时，就会用这个，一般不会用这个
        /*配置校验不同状态下显示的图标*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',//校验成功
            invalid: 'glyphicon glyphicon-remove',//校验失败
            validating: 'glyphicon glyphicon-refresh'//正在校验
        },
        /*需要校验的表单元素  通过名称 name*/
        fields: {
            /*对应表单元素的name*/
            //<input name="username" type="text" class="form-control" id="inputUserName3" placeholder="请输入用户名">
            username: {
                // message: '用户名验证失败',//默认提示
                /*校验规则 多个校验规则*/
                validators: {
                    notEmpty: {
                        message: '请输入用户名'
                    },
                    /*配置一个校验规则*/
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '请输入密码'
                    },
                    stringLength: {
                        min: 6,
                        max: 18,
                        message: '密码必须是6-18个字符'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }
            }
        },
    }).on('success.form.bv', function (e) {
        /*校验成功的时候触发*/
        /*阻止form表单的默认提交  我们要使用ajax提交*/
        e.preventDefault();
        /*后台校验用户名和密码*/
        var $form = $(e.target);
        console.log(e.target);
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: $form.serialize(),
            dataType: 'json',
            success: function (data) {
                //success
                //{"success":true}
                //error 1000 用户名错误  1001 密码错误

                /*业务成功*/
                if (data.success == true) {
                    /*跳转后台主页*/
                    location.href = '/admin33/';
                }
                /*业务失败*/
                else {
                    if (data.error == 1000) {
                        //error 1000 用户名错误
                        /*设置用户名这个表单元素的校验状态为失败*/
                        /* NOT_VALIDATED（没有校验）, VALIDATING（校验中）, INVALID（校验失败） or VALID（校验成功） */
                        /*1.获取校验组件*/
                        /*2.更改状态的函数*/
                        /*3.校验的表单，改成无状态，使用哪个校验规则*/
                        //                                              用户名  状态改为失败  校验规则
                        $form.data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
                    } else if (data.error == 1001) {
                        // error 1001 密码错误
                        //                                              密码     状态改为失败  校验规则
                        $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
                    }

                }
            }
        })

    });
});