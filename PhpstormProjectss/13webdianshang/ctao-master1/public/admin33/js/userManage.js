$(function () {
    window.page = 1;
    var render = function () {
        getUserData(function (data) {
            /*1.模板渲染*/
            var currentPage = data.page;
            var totalPages = Math.ceil(data.total / data.size);
            $('tbody').html(template('userList', data));
            setPaginator(currentPage,totalPages,render);
        })
    };
    render();



    /*2.分页展示*/
    var setPaginator = function (currentPage, totalPages, callback) {
        $('.pagination').bootstrapPaginator({
            bootstrapMajorVersion: 3,//对应的bootstrap版本,必须*
            size: 'small',//分页按钮的大小
            currentPage: currentPage,//当前页码，必须*
            totalPages: totalPages,//向上取整//一共多少页
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
                callback && callback();
            }
        });
    };


    /*3.禁用启用*/
    $('tbody').on('click', '.btn', function () {
        var $that = $(this);
        var id = $that.data('id');
        var name = $that.data('name');
        var isDelete = $that.hasClass('btn-danger') ? 0 : 1;
        $('#save').find('strong').html(($that.hasClass('btn-danger') ? '禁用' : '启用') + name);
        $('#save').modal('show');
        $('#save').off('click', '.btn-primary').on('click', '.btn-primary', function () {
            //确定就 发送请求
            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                datatype: 'json',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                success: function (data) {
                    if (data.success == true) {
                        $('#save').modal('hide');
                        render();
                    }
                }
            })
        })
    })
});


//获取数据
var getUserData = function (callback) {
    $.ajax({
        type: 'get',
        url: '/user/queryUser',
        data: {
            page: window.page,
            pageSize: 7
        },
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    })
};