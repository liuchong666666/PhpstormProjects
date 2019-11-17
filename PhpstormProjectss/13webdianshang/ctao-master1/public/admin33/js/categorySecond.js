$(function () {
    window.page = 1;

    /*模板无法访问外部变量的解决方案*/
    /*var getJquery = function () {
        return jQuery
    };
    */
    //辅助方法：在模板内部可以使用的函数
    template.helper('getJquery', function () {
        return jQuery
    });



    /*1.默认第一页列表展示*/
    var render = function () {
        getCateSecondData(function (data) {
            /*模板渲染*/
            $('tbody').html(template('list', data));
            /*初始化分页组件 根据数据*/
            /*2.分页展示*/
            $('.pagination').bootstrapPaginator({
                bootstrapMajorVersion: 3,//对应的bootstrap版本,必须*
                size: 'small',//分页按钮的大小
                currentPage: data.page,//当前页码，必须*
                totalPages: Math.ceil(data.total / data.size),//向上取整//一共多少页
                numberOfPages: 3,//按钮的数量 默认是5
                /*点击页码渲染功能*/
                /*监听按钮的点击事件  获取点击的时候的页码*/
                onPageClicked: function (event, originalEvent, type, page) {
                    /*1.event jquery的事件对象*/
                    /*2.originalEvent 原生dom的事件对象*/
                    /*3.type    按钮类型*/
                    /*4.page    按钮对应的页码*/
                    // console.log(page);
                    window.page = page;
                    render();
                }
            });
        });
    };
    render();





    /*3.点击添加分类弹窗*/
    getCateFirstData(function (data) {
        // $('.dropdown-menu').html(template('dropDown', data)).on('click','li',  function () {
        $('.dropdown-menu').html(template('dropDown', data)).find('li').on('click', function () {
            //显示选中的分类名称
            var $currA = $(this).find('a');//当前点击的li中的a中的分类名称
            $('.categoryName').html($currA.html());//将请选择换为选择的分类名称
            //给隐藏的ID表单赋值
            $('[name="categoryId"]').val($currA.attr('data-id'));//将id 赋值给隐藏的比导弹元素 input     <!--序列化表单只能获取表单元素的值-->


            /*当选择成功后，应该改校验状态*/
            /* NOT_VALIDATED（没有校验）, VALIDATING（校验中）, INVALID（校验失败） or VALID（校验成功） */
            $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
        });
    });


    //fileupload上传插件  http://www.jq22.com/jquery-info230
    initFiledUpload();



    /*4.点击确认按钮  提交（一级分类的id，二级分类名称（id自动生成），二级分类的logo）*/
    /*  $('#save').on('click','.btn-primary',function (e) {
          e.preventDefault();
          /!**!/


          $('#save').modal('hide');
          return false;
      })*/

    /*4.点击确认按钮 进行表单校验*/
    $('#form').bootstrapValidator({
        /*默认不去校验的表单元素（包含隐藏的元素）*/
        //因为bootstrapValidator默认配置对于“隐藏域（:hidden）、禁用域（:disabled）、那啥域（:not(visible)）”是不进行验证的。
        //不忽略隐藏的元素
        // excluded:['hidden'],
        excluded:[],//权限放开 全部校验


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
            categoryId: {
                // message: '用户名验证失败',//默认提示
                /*校验规则 多个校验规则*/
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传logo'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        /*校验成功的时候触发*/
        /*阻止form表单的默认提交  我们要使用ajax提交*/
        e.preventDefault();
        var $form = $(e.target);
        console.log($form.serialize());
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            dataType:'json',
            success:function (data) {
                if(data.success==true){
                    window.page = 1;
                    render();
                    $('#save').modal('hide');
                }
            }
        });
    });
});




var getCateSecondData = function (callback) {//callback好处：业务和数据分离
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data: {
            page: window.page || 1,
            pageSize: 2
        },
        dataType: 'json',
        success: function (data) {
            callback && callback(data)
        }
    });
};





var getCateFirstData = function (callback) {//callback好处：业务和数据分离
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: {
            page: 1,
            pageSize: 1000
        },
        dataType: 'json',
        success: function (data) {
            callback && callback(data)
        }
    });
};




var initFiledUpload = function () {
    /*初始化上传插件*/
    $('[ name="pic1"]').fileupload({
        /*上传地址*/
        url: '/category/addSecondCategoryPic',
        /*后台返回格式*/
        dataType: 'json',
        /*上传成功*/
        done: function (e, data) {
            // $.each(data.result.files, function (index, file) {
            //     $('<p/>').text(file.name).appendTo(document.body);
            // });
            // console.log(data);
            // console.log(data.result);
            $('#uploadImage').attr('src', data.result.picAddr);
            $('[name="brandLogo"]').val(data.result.picAddr);
            /*当选择成功后，应该改校验状态*/
            /* NOT_VALIDATED（没有校验）, VALIDATING（校验中）, INVALID（校验失败） or VALID（校验成功） */
            $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
        }
    });
};