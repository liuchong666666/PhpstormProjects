$(function () {
    window.page = 1;

    //辅助方法：使模板用外部变量
    template.helper('getJquery', function () {
        return jQuery;
    });
    //渲染数据
    var render = function () {
        getCateFirstData(function (data) {
            $('tbody').html(template('cateDataList', data));
            //配置分页
            $('.pagination').bootstrapPaginator({
                bootstrapMajorVersion: 3,//对应的bootstrap版本,必须*
                size: 'small',//分页按钮的大小
                currentPage: data.page,//当前页码，必须*
                totalPages: Math.ceil(data.total / data.size),//向上取整//一共多少页
                numberOfPages: 3,//按钮的数量 默认是5
                itemTexts: function (type, page, current) {
                    switch (type) {
                        case "first":
                            return "首页";
                        case "prev":
                            return "上一页";
                        case "next":
                            return "下一页";
                        case "last":
                            return "末页";
                        case "page":
                            return page;
                    }
                },
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




//点击确定按钮校验，提交数据 ，并且渲染页面
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '请输入一级分类名称'
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
            url:'/category/addTopCategory',
            dataType:'json',
            data:$form.serialize(),
            success:function (data) {
                window.page=1;
                //隐藏模态框
                $('#save').modal('hide');
                //渲染页面
                render();
            },
            error:function () {
                alert('添加失败,请找技术人员')
            }
        });

    });

});
//获取数据
var getCateFirstData = function (callback) {
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: window.page || 1,
            pageSize: 2
        },
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        },
        error: function () {
            alert('服务器繁忙');
        }
    });
};



