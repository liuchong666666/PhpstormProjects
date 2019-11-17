$(function () {
    // window.allData = [];
    /*区域滚动*/
    mui('.mui-scroll-wrapper').scroll({
        indicators: false
    });

    /*1.页面初始化的时候，关键字在输入框内显示*/
    /*获取关键字*/
    //已经封装到了common.js里面

    // var getParamsByUrl = function () {
    //     /*以对象存储地址栏信息*/
    //     var params = {};
    //     var search = location.search;//"?key=1"//可以在console控制台直接敲locaton 看里面的信息 然后再locaton.search
    //     if (search) {
    //         search = search.replace('?', '');//"key=1"
    //         //这是一个键值对的情况
    //         //var arr= search.split('=');//["key","1"]//以等号分隔
    //         //如果有多个键值对
    //         var arr = search.split('&');
    //         arr.forEach(function (item, i) {
    //             var itemArr = item.split('=');//["key","value"]   itemArr[0] 就是key    itemArr[1]就是value
    //             params[itemArr[0]]=itemArr[1];//然后将上面截取到键值对  赋值给params对象
    //         })
    //
    //     }
    //     //如果没有search，就返回空的
    //     console.log(params);
    //     return params;
    // };
    var urlParams = CT.getParamsByUrl();
    var $input = $('input').val(decodeURI(urlParams.key) || '');


    /*2.页面初始化的时候，根据关键字查询第一页数据4条*/
    /*下拉刷新的时候配置自动执行  重复操作  auto: true*/
    // getSearchData({
    //     proName: urlParams.key,
    //     page: 1,
    //     pageSize: 4
    // }, function (data) {
    //     /*渲染数据*/
    //     $('.ct_product').html(template('list', data));
    // });

    /*3.用户点击搜索 根据新关键字搜索商品 重置排序功能*/
    $('.ct_search a').on('tap', function () {
        var key = $.trim($input.val());
        if (!key) {
            mui.toast('请输入关键字');
            return false;
        } else {
            getSearchData({
                proName: key,
                page: 1,
                pageSize: 10
            }, function (data) {
                /*渲染数据*/
                $('.ct_product').html(template('list', data));
                CT.addLocalData(key);
                mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
            });
        }
    });

    /*4.用户点击排序的时候，根据排序的选项去进行排序（默认的时候 降序 再次点击的时候 升序）*/
    $('body').on('tap', '.ct_order a',function () {
        /*当前点击的a*/
        var $this = $(this);
        /*如果之前没被选中*/
        if (!$this.hasClass('now')) {
            /*选中，其他不选中，箭头默认朝下*/
            $this.addClass('now').siblings().removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');

        } else {
            /*有now的时候*/
            /*该当前箭头方向*/
            if ($this.find('span').hasClass('fa-angle-down')) {
                // console.log($(this).attr('class'));
                $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
            } else {
                $this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
            }
        }


        /*如果已经选择了 改变箭头的方向*/
        // if ($(this).hasClass('now')) {
        //     if ($(this).find('span').hasClass('fa-angle-down')) {
        //         // console.log($(this).attr('class'));
        //         $(this).find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
        //     } else{
        //         $(this).find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        //
        //     }
        // } else {
        //     /*改变当前样式*/
        //     $(this).addClass('now').siblings().removeClass('now');
        // }


        var key = $.trim($input.val());
        if (!key) {
            mui.toast('请输入关键字');
            return false;
        }
        /*获取当前点击的功能参数 price 1 2 num 1 2*/
        var order = $this.attr('data-order');//当作键 price num
        // console.log(typeof(order));
        var orderVal = $this.find('span').hasClass('fa-angle-up') ? 1 : 2;
        var params = {
            proName: key,
            page: 1,
            pageSize: 10
            /*排序方式*/
            // order:orderVal//这方法错的 结果回事  order:1  或者  order:2  键没法传变量
            //所以得用下面的方法     // params[order] = orderVal;
        };
        /*获取数据*/
        params[order] = orderVal;
        getSearchData(params, function (data) {
            // console.log(data);
            /*渲染数据*/
            $('.ct_product').html(template('list', data));
        })


        /*获取数据*/
    });
    /*5.用户下拉刷新  根据当前条件刷新 上拉加载重置 排序功能也重置*/
    mui.init({
        pullRefresh: {
            /*下拉容器*/
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            /*下拉*/
            down: {
                /*当时最近更新的功能*/
                /*默认*/
                // // style:'circle',//必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
                // color:'#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
                // height:'50px',//可选,默认50px.下拉刷新控件的高度,
                // range:'100px', //可选 默认100px,控件可下拉拖拽的范围
                // offset:'0px', //可选 默认0px,下拉刷新控件的起始位置
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    // console.log('后台获取数据');

                    //组件对象
                    var that = this;
                    var key = $.trim($input.val());
                    if (!key) {
                        mui.toast('请输入关键字');
                        return false;
                    }
                    /*排序功能也重置*/
                    $('.ct_order a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');

                    getSearchData({
                        proName: key,
                        page: 1,
                        pageSize: 10
                    }, function (data) {
                        console.log(data.data.length);

                        // allData.push(data);
                        // console.log(allData);
                        setTimeout(function () { //不用这个的话 加载太快了 ，  用这个模拟加载慢一点
                            // if(data.data.length>0){
                            //     that.enablePullupToRefresh();
                            //     that.endPulldownToRefresh();
                            //
                            // }
                            if (data.data.length<=0) {
                                //如果没有数据 就不准有上拉动作 并且停止下拉刷新
                                that.endPullupToRefresh(true);
                                that.endPulldownToRefresh();
                            }

                            /*渲染数据*/
                            $('.ct_product').html(template('list', data));
                            /*注意：停止下拉刷新*/
                            // mui('#refreshContainer').pullRefresh().endPulldown();  //这个在这不行 应该是版本问题
                            that.endPulldownToRefresh();


                            /*上拉加载重置*/
                            that.refresh(true);
                            // console.log(page);
                        }, 1000);
                    })
                }
            },
            /*上拉*/
            /*6.用户上拉的时候  加载下一页 （没有数据不去加载了）*/

            up: {
                height:150,
                contentrefresh: '正在加载...',
                contentnomore:'没有更多数据了',
                // height:50,//可选.默认50.触发上拉加载拖动距离
                // auto:true,//可选,默认false.自动上拉加载一次
                // contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                // contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: function () { //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    window.page++;
                    //组件对象
                    var that = this;
                    var key = $.trim($input.val());
                    if (!key) {
                        mui.toast('请输入关键字');
                        return false;
                    }

                    /*获取当前点击的功能参数 price 1 2 num 1 2*/
                    //因为不是点击了 所以用选择器获取当前排序的类型
                    var order = $('.ct_order a.now').attr('data-order');//当作键 price num
                    // console.log(typeof(order));
                    var orderVal = $('.ct_order a.now').find('span').hasClass('fa-angle-up') ? 1 : 2;
                    var params = {
                        proName: key,
                        page: window.page,
                        pageSize: 10
                        /*排序方式*/
                        // order:orderVal//这方法错的 结果回事  order:1  或者  order:2  键没法传变量
                        //所以得用下面的方法     // parsams[order] = orderVal;
                    };
                    /*获取数据*/
                    params[order] = orderVal;
                    getSearchData(params, function (data) {
                        console.log(data);
                        // if(!data.data.length || data.data.length < 10){
                        //     that.endPullupToRefresh(true);
                        //     return false;
                        // }
                        // /*渲染*/
                        // $('.ct_product').append(template('list', data));
                        // that.endPullupToRefresh();
                        // allData.push(data);
                        // console.log(allData);
                        setTimeout(function () { //不用这个的话 加载太快了 ，  用这个模拟加载慢一点
                            // console.log(page);
                            // console.log(data);

                            /*注意：停止上拉刷新*/
                            if (data.data.length) {
                                that.endPullupToRefresh();
                            } else {
                                that.endPullupToRefresh(true);
                                return false;
                            }
                            /*渲染数据*/
                            $('.ct_product').append(template('list', data));
                        }, 1000);
                    })
                }
            }
        }
    });
    /*6.用户上拉的时候  加载下一页 （没有数据不去加载了）*/

    /**/
    /**/
});
var getSearchData = function (params, callback) {
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (data) {
            /*存当前页码*/
            window.page = data.page;
            callback && callback(data);
        }
    });
};