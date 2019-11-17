$(function () {
    window.page = 1;
    window.picLength = 3;
    var editorId = null;
    //辅助方法：模板使用外部变量
    template.helper('getJquery', function () {
        return jQuery
    });
    //渲染页面
    var render = function () {
        getProductData(function (data) {
            // console.log(data);
            var pageCurr = data.page;
            var pageSum = Math.ceil(data.total / data.size);
            $('tbody').html(template('productList', data));
            //分页
            setPagination(pageCurr, pageSum, render);
        })
    };
    //渲染页面
    render();


    //下拉列表数据
    getSecondCateData(function (data) {
        $('.brandId').html(template('brandIdList', data))
    });

    //初始化上传插件
    initUpload();

//添加：
    //下拉列表点击事件:dataId为点击的li的data-id     自己封装的下拉列表函数
    selectList('#addBrandId', '.select_add_brand', function (dataId) {
        console.log(dataId);
        //将隐藏的表单元素的value设置dataId
        $('[name="brandId"]').val(dataId);

        $('#add_form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
        console.log('brandId');

    });
    selectList('#product_add_statu', '.select_add_statu', function (dataId) {
        console.log(dataId);
        $('[name="statu"]').val(dataId);
        $('#add_form').data('bootstrapValidator').updateStatus('statu', 'VALID')
    });
//编辑：
    //下拉列表点击事件:dataId为点击的li的data-id     自己封装的下拉列表函数
    selectList('#editorBrandId', '.select_editor_brand', function (dataId) {
        console.log(dataId);
        //将隐藏的表单元素的value设置dataId
        $('[name="brandId"]').val(dataId);

        $('#editor_form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
        console.log('brandId');

    });
    selectList('#product_editor_statu', '.select_editor_statu', function (dataId) {
        console.log(dataId);
        $('[name="statu"]').val(dataId);
        $('#editor_form').data('bootstrapValidator').updateStatus('statu', 'VALID')
    });


    //自定义校验规则
    $.fn.bootstrapValidator.validators.checkSize = {
        validate: function (validate, $field, options) {
            // 表单输入的值
            var value = $.trim($field.val());
            if (!value) return {
                valid: false,
                message: '请输入尺码'
            };
            if (!/^[2-6][0-9]-[2-6][0-9]$/.test(value)) return {valid: false, message: '请输入合法尺码'};
            return true;
        }
    };
    $.fn.bootstrapValidator.validators.checkNum = {
        validate: function (validate, $field, options) {
            // 表单输入的值
            var value = $.trim($field.val());
            if (!value) return {
                valid: false,
                message: '请输入库存'
            };
            if (!/^[1-9]\d*$/.test(value)) return {valid: false, message: '请输入合法库存'};
            return true;
        }
    };
    $.fn.bootstrapValidator.validators.checkPic = {
        validate: function (validate, $field, options) {
            if (picList.length != picLength) return {
                valid: false,
                message: '请上传'+picLength+'张图片'
            };
            return true
        }
    };
    //校验
    var options =
        {
            excluded: [],
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            /*设置校验属性*/
            fields: {
                proName: {
                    validators: {
                        notEmpty: {
                            message: '请输入商品名称'
                        }
                    }
                },
                proDesc: {
                    validators: {
                        notEmpty: {
                            message: '请输入商品描述'
                        }
                    }
                },
                num: {
                    validators: {
                        //自定义规则
                        checkNum: {}
                    }
                },
                price: {
                    validators: {
                        notEmpty: {
                            message: '请输入价格'
                        },
                        regexp: {
                            regexp: /^\d*$/,
                            message: '请输入数字'
                        }
                    }
                },
                oldPrice: {
                    validators: {
                        notEmpty: {
                            message: '请输入价格'
                        },
                        regexp: {
                            regexp: /^\d*$/,
                            message: '请输入数字'
                        }
                    }
                },
                size: {
                    validators: {
                        //自定义规则
                        checkSize: {}
                    }
                },
                brandId: {
                    validators: {
                        notEmpty: {
                            message: '请选择商品名牌'
                        }
                    }
                },
                pic: {
                    validators: {
                        checkPic: {}
                    }
                },
                statu: {
                    validators: {
                        notEmpty: {
                            message: '请选择是否上架'
                        }
                    }
                }
            }

        };
    //添加校验
    $("#add_form").bootstrapValidator(options).on('success.form.bv', function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var data = $form.serialize();

        /*图片上传的参数名称*/
        /*picName1=picAddr1*/
        /*picName2=picAddr2*/
        /*picNamepicLength=picAddrpicLength*/
        /*每次上传成功记录一下  通过数组*/
        $.each(picList, function (i, item) {
            data += '&picName' + (i + 1) + '=' + item.picName + '&picAddr' + (i + 1) + '=' + item.picAddr;
        });
        console.log(data);
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.success == true) {
                    //模态框关闭
                    $('#save').modal('hide');
                    //渲染页面
                    render();
                }
            }
        });
    });


//编辑校验
    $("#editor_form").bootstrapValidator(options).on('success.form.bv', function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var data = $form.serialize();
        data += '&id=' + editorId;
        /*图片上传的参数名称*/
        /*picName1=picAddr1*/
        /*picName2=picAddr2*/
        /*picNamepicLength=picAddrpicLength*/
        /*每次上传成功记录一下  通过数组*/
        $.each(picList, function (i, item) {
            data += '&picName' + (i + 1) + '=' + item.picName + '&picAddr' + (i + 1) + '=' + item.picAddr;
        });
        console.log(data);
        $.ajax({
            type: 'post',
            url: '/product/updateProduct',
            data: data,
            dataType: 'json',
            success: function (data) {
                if (data.success == true) {
                    //模态框关闭
                    $('#editor').modal('hide');
                    //渲染页面
                    render();
                    console.log(12);
                }
            }
        });

    });

    /*模态框*/
    //点击添加商品按钮出现模态框
    $('#addBtn').on('click', function () {
        //每次退出去，然后再点击添加按钮，图片就会清空 得重新传
        picList = [];
        $('.img').html('');
        $('#add_form').data('bootstrapValidator').updateStatus('pic', 'NOT_VALIDATED');

        $('#save').modal('show');
    });
    //点击编辑
    $('body').on('click', '#editorBtn', function () {
        //每次退出去，然后再点击编辑按钮，图片就会清空 得重新传
        picList = [];
        $('.img').html('');
        $('#editor_form').data('bootstrapValidator').updateStatus('pic', 'NOT_VALIDATED');
        $('#editor').modal('show');
        editorId = $(this).data('id');
    });
    //上下架
    $('.table-bordered').on('click', '.changeStatu', function () {
        // var $that = $(this);
        // var $proName = $that.parent().parent().find('td').eq(1).html();
        // var $proDesc = $that.parent().parent().find('td').eq(2).html();
        // var $num = $that.parent().parent().find('td').eq(picLength).html();
        // var $size =$that.parent().parent().find('td').eq(4).html();
        // var $oldPrice= $that.parent().parent().find('td').eq(5).html();
        // var $price = $that.parent().parent().find('td').eq(6).html();
        // var $statu = $that.hasClass('btn-danger')?0:1;
        // var $id = $that.siblings().data('id');
        // var $brandId = $that.parent().parent().data('id');
        // var data = {
        //     proName: $proName,
        //     proDesc: $proDesc,
        //     num: $num,
        //     size: $size,
        //     oldPrice: $oldPrice,
        //     price: $price,
        //     statu: $statu,
        //     id: $id,
        //     brandId: $brandId
        // };
        // console.log(data);
        $('#change_stau_modal').modal('show');
        // $('#change_stau_modal').find('strong').html($that.hasClass('btn-danger') ? '下架' : '上架');
        $('#change_stau_modal').on('click', '.btn-primary', function () {
            alert('下架该功能还未实现,敬请期待');
        });
        //     console.log(123);
        //     $.ajax({
        //         type: 'post',
        //         url: '/product/updateProduct',
        //         data: data,
        //         dataType: 'json',
        //         success: function (data) {
        //             console.log(data);
        //             if (data.success == true) {
        //                 //模态框关闭
        //                 $('#change_stau_modal').modal('hide');
        //                 //渲染页面
        //                 getProductData(function (data2) {
        //                     console.log(data2)
        //                 });
        //                 render();
        //             }
        //         }
        //     });
        // }).on('click', '.btn-default', function () {
        //     $('#change_stau_modal').modal('hide')
        // }).on('click', '.change_stau_modal_span', function () {
        //     $('#change_stau_modal').modal('hide')
        // })

    });


});
//分页设置
var setPagination = function (pageCurr, pageSum, callback) {
    $('.pagination').bootstrapPaginator({
        /*当前使用的是picLength版本的bootstrap*/
        bootstrapMajorVersion: 3,
        /*配置的字体大小是小号*/
        size: 'small',
        /*当前页*/
        currentPage: pageCurr,
        /*一共多少页*/
        totalPages: pageSum,
        /*点击页面事件*/
        onPageClicked: function (event, originalEvent, type, page) {
            /*改变当前页再渲染 page当前点击的按钮的页面*/
            window.page = page;
            callback && callback();
        }
    });
};
//获取商品数据
var getProductData = function (callback) {
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetailList',
        data: {
            page: window.page || 1,
            pageSize: 5
        },
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    })
};
//获取二级分类品牌
var getSecondCateData = function (callback) {
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data: {
            page: 1,
            pageSize: 99999,
        },
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
            console.log(data);
        }
    })
}

//上传插件
var picList = [];
var initUpload = function () {
    // var progress = 0;
    $('[name="pic1"]').fileupload({
        dataType: 'json',
        // //上传的进度条
        // progressall: function (e, data) {
        //
        //     progress = parseInt(data.loaded / data.total * 100, 10);
        //     $('#progress .bar').css(
        //         'width',
        //         progress + '%'
        //     );
        //     progress=0;
        // },
        done: function (e, data) {
            console.log(picList);
            if (picList.length < picLength) {
                picList.push(data.result);
                $(this).parent().next().append('<img src="' + data.result.picAddr + '" width="100" height="100">')
            }
            if (picList.length == picLength) {
                $('#add_form').data('bootstrapValidator').updateStatus('pic', 'VALID')
                $('#editor_form').data('bootstrapValidator').updateStatus('pic', 'VALID')

            }
        }
    });
};

//对下拉列表点击封装  dom：要操作得下拉ul  id：是请选择元素  callback回调函数:传入参数为点击的li对应的data-id
var selectList = function (dom, id, callback) {
    $(dom).on('click', 'li', function () {
        $(id).html($(this).find('a').html());//将""请选择"替换掉
        callback && callback($(this).data('id'));//调用函数时可以直接获得点击li对应的data-id
    })
};