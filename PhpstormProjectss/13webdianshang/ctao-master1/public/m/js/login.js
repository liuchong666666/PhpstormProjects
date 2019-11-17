$(function () {


    /*在ie6.7中 json未定义 用json2.js插件解决（https://www.cnblogs.com/youring2/archive/2013/03/01/2938850.html）*/
    // var str = '{"name":"12"}';
    // console.log(JSON.parse(str));


    $('#submit').on('tap',function () {
        /*1.获取表单序列化(serialize())数据 序列化成字符串  ， serializeArray()序列化成数组*/
        /*2.需要有name属性*/

        // var data = $('form').serializeArray();//表单序列化为数组
        // console.log(data);

        var data = $('form').serialize();//表单序列化
        /*3.valid 校验*/
        /*4.data类型为string "key=value&k=v"==转为==> {key:value,k:v} */
        var dataObject = CT.serialize2Object(data);

        /*校验*/
        if (!dataObject.username) {
            mui.toast('请您输入用户名');
            return false;
        }
        if (!dataObject.password) {
            mui.toast('请您输入密码');
            return false;
        }

        $.ajax({
            type: 'post',
            url: '/user/login',
            /*这里的data， 对象  serialize  serializeArray都支持 但是后台支不支持就是另一回事了*/
            data: dataObject,
            /*程序成功*/
            success: function (data) {
                /*如果成功    根据传过来的地址跳转*/
                /*如果没有地址来 默认跳转到个人中心首页*/
                if (data.success == true) {//{"success":true}  前端接口文档里面
                    /*业务成功*/
                    var returnUrl = location.search.replace('?returnUrl=', '');
                    if (returnUrl) {
                        location.href = returnUrl;
                    } else {
                        location.href = CT.userUrl;
                    }
                }else{
                    /*业务不成功*/
                    //{error: 403, message: "密码错误！"}
                    // {error: 403, message: "用户名不存在! "}
                    mui.toast(data.message);
                }
            }

        });
    })


});