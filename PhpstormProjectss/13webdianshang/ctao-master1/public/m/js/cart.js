$(function () {
    /*区域滚动*/
    mui('.mui-scroll-wrapper').scroll({
        indicators: false,
    });
    /*初始化上下拉*/

    mui.init({
        pullRefresh: {
            /*下拉容器*/
            container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            /*下拉*/
            down: {
                auto: true,
                callback: function () {//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                    /*1.初始化页面   自动下拉刷新*/
                    var that = this;
                    /*定义一个全局的 下拉组件对象 原因：想使用里面得方法*/
                    // window.down = this;//初始化之后给window挂上down的对象  这个对象就可以用里面得方法了
                    setTimeout(function () {
                        getCartData(function (data) {
                            /*渲染页面*/
                            $('.mui-table-view').html(template('cart', data));
                            /*加载状态隐藏*/
                            that.endPulldownToRefresh();
                            /*注册刷新事件  注意：防止多次绑定 加载完后又绑定一次的现象  现在是没有出现
                            * 所以最好先解绑再绑定
                            * */

                            /*4.点击刷新按钮 刷新*/
                            $('.fa-refresh').off('click').on('click', function () {//也可以放外面，就是要定义全局对象下拉组件对象
                                that.pulldownLoading();
                            })
                        })
                    }, 100);
                }
            }
        }
    });
    /*1.初始化页面   自动下拉刷新*/
    /*2.侧滑的时候   点击编辑 弹出对话框（尺码，数量）*/

    //$('.fa-refresh').on('tap',function () {//也可以直接放上面mui初始化里面
    /*刷新  触发下拉操作*/
    /*上面初始化了这个pullRefresh组件*/
    // mui('#refreshContainer').pullRefresh().pulldownLoading();//可以直接这样做  不用window.down的对象
    // window.down.pulldownLoading();
    // })


    /*3.侧滑的时候   点击删除 确认对话框 */
    //找不是动态渲染里面的对应按钮的父元素
    $('.mui-table-view').on('tap', '.mui-icon-compose', function (e) {
        //修复iOS 8.x平台存在的bug，使用plus.nativeUI.prompt会造成输入法闪一下又没了
        e.detail.gesture.preventDefault();
         var li = this.parentNode.parentNode;
        /*弹窗内容*/
        /*默认的字符串===》html格式的字符串*/
        /*获取当前按钮对应的商品数据*/
        /*根据ID去缓存获取*/
        var $that = $(this);
        var id = $(this).parent().attr('data-id');
        var item = CT.getItemById(window.cartData.data, id);
        var html = template('edit', item);


        /*mui在使用字符串作为内容时候  会把\n 加上<br>  \t默认空格*/
        mui.confirm(html.replace(/\n/g, ''), '商品编辑', ['确认', '取消'], function (e) {
            //先解绑再绑定

            if (e.index == 0) {
                /*发送请求*/
                var size = $('.btn_size.now').html();
                var num = $('.p_number input').val();
                CT.loginAjax({
                    type: 'post',
                    url: '/cart/updateCart',
                    data: {
                        id: id,
                        size: size,
                        num: num
                    },
                    dataType: 'json',
                    success: function (data) {
                        // console.log(data);//{success: true}
                        if (data.success == true) {
                            mui.toast('编辑成功');
                            mui.swipeoutClose(li);
                            /*窗口关闭*/
                            /*列表更新*/
                            item.num = num;
                            item.size = size;
                            $(li).find('#cart_number').html(item.num);
                            $(li).find('#cart_size').html(item.size);
                            /*缓存的数据  window.cartData.data  已修改*/
                            // $('.mui-table-view').html(template('cart', window.cartData));
                            // console.log(item);
                            // getCartData(function (data) {
                            //     console.log(data);
                            // });
                            /*整个列表重新渲染的*/
                           setAmount();//这个方法只针对dom改变
                        }
                    }
                });
            } else {
                //TODO
                mui.swipeoutClose(li);
            }
        });
    });

    /*获取尺码和数量*/
    /*伪态方式*/
    $('body').on('tap', '.btn_size', function () {
        $(this).addClass('now').siblings().removeClass('now');
    });
    $('body').on('tap', '.p_number span', function () {
        var input = $(this).siblings('input');
        var currNum = input.val();
        var maxNum = parseInt(input.attr('data-max'));
        if ($(this).hasClass('jian')) {
            if (currNum <= 1) {
                mui.toast('至少一件商品');
                return false;
            }
            currNum--;
        } else {
            if (currNum >= maxNum) {
                mui.toast('库存不足');
                return false;
            }
            currNum++;
        }
        input.val(currNum);
        return currNum;
    });
    //删除
    $('.mui-table-view').on('tap', '.mui-icon-trash', function () {


        var li = this.parentNode.parentNode;
        var $this = $(this);
        // /cart/deleteCart
        var id = $this.parent().attr('data-id');
        /*mui在使用字符串作为内容时候  会把\n 加上<br>  \t默认空格*/
        mui.confirm('你确定是否删除该商品', '商品删除', ['确认', '取消'], function (e) {
            if (e.index == 0) {
                CT.loginAjax({
                    type: 'get',
                    url: '/cart/deleteCart',
                    data: {
                        id: id
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.success == true) {
                            /*后台成功删除*/
                            /*商品列表更新*/
                            /*再在页面删除自己*/
                            $this.parent().parent().remove();
                            setAmount();
                        }
                    }
                })
            } else {
                //TODO
                mui.swipeoutClose(li);
            }
        })
    });


    /*4.点击刷新按钮 刷新*/

    /*5.点击复选框   计算总金额*/
    $('.mui-table-view').on('change', '[type=checkbox]', function () {
        /* 总金额 = 每个商品数量*单价 的总和 */
        setAmount();
    })


});
var setAmount = function () {
    /*所有选中的复选框*/
    var $checkedBox = $('[type=checkbox]:checked');
    /*获取选中商品的id*/

    /*$.each(i,item)可遍历对象、可遍历数组、jQuery集合
      $dom.each(i,item)   jQuery对象才能调用
      arr.forEach(item,i) 数组才能调用
      */
    var amountSum = 0;
    $checkedBox.each(function (i, item) {
        var id = $(this).attr('data-id');
        var item1 = CT.getItemById(window.cartData.data, id);
        var num = item1.num;
        var price = item1.price;
        var amount = num * price;
        amountSum += amount;
    });
    // if (Math.floor(amountSum * 100) % 10) {//余上10 如果有数字就不处理
    //     amountSum = Math.floor(amountSum * 100) / 100;
    // } else {//余上10 如果没有数字就加个0
    //     amountSum = Math.floor(amountSum * 100) / 100;
    //     amountSum = amountSum.toString() + '0';
    // }
    //小数点后两位的后面向下取整
    amountSum =Math.floor(amountSum * 100)/100;

    $('#cartAmount').html(amountSum);
};
var getCartData = function (callback) {
    CT.loginAjax({
        type: 'get',
        url: '/cart/queryCartPaging',
        data: {
            page: 1,
            /*不产生分页  需要修改接口*/
            pageSize: 100
        },
        dataType: 'json',
        success: function (data) {
            window.cartData = data;
            callback && callback(data);
        }
    })
};