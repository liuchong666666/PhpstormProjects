$(function () {
    /*区域滚动*/
    mui('.mui-scroll-wrapper').scroll({
        indicators:false
    });
    /*轮播图*/
    mui('.mui-slider').slider({
        interval:2000,

    });
    var params ={
        proName: 1,
        page: 1,
        pageSize: 10
    };
    getSearchData(params,function (data){
        console.log(123);
        $('.ct_product').html(template('list',data))
    })

});
var getSearchData = function (params, callback) {
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (data) {
            /*存当前页码*/

            callback && callback(data);
        }
    });
};