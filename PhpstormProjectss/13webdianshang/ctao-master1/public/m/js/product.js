$(function () {
    // console.log(CT.getParamsByUrl().productId);
    var id = CT.getParamsByUrl().productId;
    getProductData(id, function (data) {
        // 清除加载状态
        $('.loading').remove();
        /*渲染商品详情页*/
        $(".mui-scroll").html(template('detail', data));
        /*轮播图*/
        mui('.mui-slider').slider({
            interval: 2000,
        });
        /*区域滚动*/
        mui('.mui-scroll-wrapper').scroll({
            indicators: false
        });

        /*1.尺码的选择*/
        $('.btn_size').on('tap', function () {
            $(this).addClass('now').siblings().removeClass('now');
        });
        /*2.数量的选择*/
        $('.p_number span').on('tap', function () {
            var input = $(this).siblings('input');
            var currNum = input.val();
            // console.log(typeof(currNum));
            var maxNum = parseInt(input.attr('data-max'));//这里取出来的是字符串//字符串和字符串比较 是以Unicode字符码比的
            // 页面上得到的数据最好转一下 ，免得是字符串  字符串和任何数字相比都会转为数字
            if ($(this).hasClass('jian')) {
                if (currNum == 0) {
                    mui.toast('数量不能小于0');
                    return false;
                }
                currNum--;
            } else {
                /*不超过库存*/
                if (currNum >= maxNum) {
                    /*tap封装的事件会出现：消息框点击的时候会消失 正好和加号在一块（击穿tap,点击穿透） 处理：加一个一次性定时器延迟*/
                    /*用clic原生的就不会（不用加一次性定时器）  但是click不能放这个获取数据函数外面，因为click必须得页面加载完才能用  */
                    setTimeout(function () {
                        mui.toast('库存不足');//这个位置在加号那里 一直点的话会点到这个，一点到这个就会消失， 所以一直点的话 就感觉会不出现
                    }, 10);
                    return false;
                }
                currNum++;
            }
            input.val(currNum);
        });
        /*3.加入购物车*/
        $('.btn_addCart').on('tap', function () {
            /*数据校验*/
            /**/
            var $changeBtn = $('.btn_size.now');//通过有没有now的样式，判断尺码有没有被选中
            if (!$changeBtn.length) {//说明长度为0尺码处没被选择
                mui.toast('请您选中尺码');
                return false;
            }
            var num = $(".p_number input").val();//数量，仅读的 一定有数据
            if (num <= 0) {
                mui.toast('请您选择数量');
                return false;
            }

            /*提交数据*/
            CT.loginAjax({
                url: '/cart/addCart',
                type: 'post',
                data: {
                    productId: id,
                    num: num,
                    size: $changeBtn.html()
                },
                dataType: 'json',
                success: function (data) {
                    if (data.success == true) {
                        /*弹出提示框*/
                        /*content*/
                        /*title*/
                        /*btn text []*/
                        /*click btn callback*/
                        mui.confirm('添加成功，去购物车看看？', '温馨提示', ['是', '否'], function (e) {
                            if (e.index == 0) {
                                //选择是
                                location.href=CT.cartUrl;
                            } else {
                                //TODO
                            }
                        });


                    }
                }
            })
        });


    });
});
var getProductData = function (productId, callback) {
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: productId
        },
        dataType: 'json',
        success: function (data) {
            setTimeout(function () {
                callback && callback(data);
            }, 1000);

        }
    })
};