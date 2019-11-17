/*
 一，先随机生成4位字母加数字组合的验证码，
 将生成的验证码转为小写，
 并将验证码显示在文本框*/
$(document).ready(function () {
    /**
     * 1，设置个空字符串函数变量名(run)
     * 2,设置个变量接受随机数
     * 3，用switch case生成验证码，重复四次（for循环）
     * 4.输出最终验证码
     * 5，将验证码赋值给文本框（creat_yzm）
     */
        //1，设置个空字符串函数变量名(run)
    var run = "";
    //2,设置个变量接受随机数
    var random_num;
    //3，用switch case生成验证码，重复四次（for循环）
    for (var i = 0; i < 4; i++) {
        random_num = Math.floor(Math.random() * 3)//生成0-2的随机数，floor向下取整10.5--》10
        console.log(random_num);
        switch (random_num) {
            case 0:
                var r = (Math.floor(Math.random() * 27) + 'a');

                run += r;
                console.log("0:" + run);
                break;
            case 1:
                var r1 = (Math.floor(Math.random() * 27) + 'A');
                run += r1;
                console.log("1:" + run);
                break;
            case 2:
                run += (Math.floor(Math.random() * 11));
                console.log("2:" + run);
                break;

        }

    }
    console.log("最终" + run);


    /* 二，提示用户输入验证码，用户输入后，获取用户输入的验证码（文本框的值）*/
    /* 三，将用户输入的验证码全转为小写，（用户输入端不区分大小写）*/

    /* 四，当用户点验证时，将用户与生成的验证码比较，若一直就提示成功，不一致就提示失败，重新输入 */
    function check() {
        /**
         * 1.获取用户输入框的值（input_yzm）
         * 2.将用户输入的验证码全转为小写，（用户输入端不区分大小写）
         * 3.当用户点验证时，将用户与生成的验证码比较，若一直就提示成功，不一致就提示失败，重新输入
         */

    }


    $("#yz_frm").dialog({
        autoOpen: false,
        buttons: [
            {
                text: "确认无误，请提交",
                click: function () {
                    // $(this).submit();


                }
            },
            {
                text: "取消",
                click: function () {
                    $(this).dialog("close");
                }
            }
        ],
    });
    $("#denglu").click(function () {
        $("#username_span").text($("#username").val());
        $("#password_span").text($("#password").val());
        $("#yz_frm").dialog("open");
    });
    $("#btn").click(function () {
        console.log("去程日期：" + $("#txtDate").val() + "返程日期：" + $("#txtNewDate").val());
    });
    $("#txtDate").focus(function () {
        WdatePicker({
            isShowToday: false,//是否显示今天按钮
            isShowClear: false,
            isShowOk: false,
            minDate: "%y-%M-%d",//最小日期为今天
            maxDate: "%y-%M-{%d+19}",
            onpicked: function () {
                $("#txtNewDate").val($(this).val());//把选取的旧值赋值给新的日期上面，让新的日期初始值变成选取的旧值为开始
                $("#txtNewDate").focus();//选完前面的，直接聚焦到后面的
            }
        });

    });
    $("#txtNewDate").focus(function () {
        WdatePicker({
            isShowToday: false,//是否显示今天按钮
            isShowClear: false,
            isShowOk: false,
            minDate: "#F{$dp.$D('txtDate') || '%y-%M-%d'}",//txtDate为上面的日期
            maxDate: "%y-%M-{%d+19}",
            onpicking: function (dp) {//onpicking 正在修改中
                var oldDate = dp.cal.getDateStr();//获取返回前的日期对象格式化值
                var newDate = dp.cal.getNewDateStr();//获取返回选择后的日期对象的格式化值
                if (newDate != oldDate) {
                    var ret = window.confirm("是否用" + newDate + "取代" + oldDate);// window.confirm（）返回Boolean类型
                    if (ret) {
                        return false;//不取消
                    } else {
                        return true;//取消当前的事件
                    }
                }
            }

        });
    });
    //对表单进行验证
    //1. 初始化
    $.formValidator.initConfig();
    $("#username").formValidator({
        onshow: "请输入账号，6-18位",
        onfocus: "字母、数字、下划线组成",
        oncorrect: "恭喜你，用户名可用"
    }).InputValidator({
        type: "size",
        min: 6,
        max: 18,
        onerror: "用户名必须是6-18位"
    });
    $("#password1").formValidator({
        onshow: "请输入密码，6-18位",
        onfocus: "密码不能低于6位，高于18位哦",
        oncorrect: "密码合法"
    }).InputValidator({
        min: 6,
        max: 18,
        onerror: "密码不能低于6位，高于18位哦"
    });
    $("#password2").formValidator({
        onshow: "请重复输入密码",
        onfocus: "两次密码必须一致哦",
        oncorrect: "密码一致"
    }).InputValidator({
        min: 6,
        max: 18,
        onerror: "密码不能低于6位，高于18位哦"
    }).CompareValidator({
        desID: "password1",
        operateor: "=",
        onerror: "2次密码不一致，请确认"
    });
    $("#user").submit(function () {
//              		  return false;//无论如何都提交不上去
        return $.formValidator.PageIsValid();//表单输入没错误就可以提交上去
    })

})