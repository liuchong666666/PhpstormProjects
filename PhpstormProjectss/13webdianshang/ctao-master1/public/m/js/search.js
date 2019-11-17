$(function () {
    // $('.ct_history').html(template('ct_history_storage', {}));
    $('.ct_history').html(template('ct_history_storage',{model:CT.getLocalData()}));
    $('.ct_search a').on('tap', function () {
        /*跳转去搜索列表页 并且需要带上关键字*/
        var key = $.trim($('input').val());
        /*判断 没有关键字就提示用户”请输入关键字搜索“*/
        if (!key) {
            /*mui消息提示*/
            mui.toast('请输入关键字搜索', {duration: 'short', type: 'div'})
        }
        /*如果合法*/
        /*searchList.html?key=xxx*/
        else {
            location.href = 'searchList.html?key=' + key;
            CT.addLocalData(key);
            // return false;
        }
    });
    $('body').on('tap', '.icon_delete', function () {
        var dataKey = $(this).parent().attr('data-key');
        CT.delLocalData(dataKey);
        $('.ct_history').html(template('ct_history_storage',{model:CT.getLocalData()}))
    }).on('tap','.icon_clear',function () {
        localStorage.clear();
        $('.ct_history').html(template('ct_history_storage',{model:CT.getLocalData()}))
    }).on('tap','.enter_search',function () {
        var dataKey = $(this).parent().attr('data-key');
        window.location.href = 'searchList.html?key='+ dataKey;
    })
});


