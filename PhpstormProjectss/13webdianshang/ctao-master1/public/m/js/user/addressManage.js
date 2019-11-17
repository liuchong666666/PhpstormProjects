$(function () {
    //三级联动
    var picker = new mui.PopPicker({layer:3});
    picker.setData(cityData);
    var addressId = location.search.replace('?addressId=', '');
    if (addressId) {
        $('.title').html('修改收货地址');
        getUserAddress(function (data) {
            var detail = CT.getItemById(data, addressId);
            $('[name="recipients"]').val(detail.recipients);
            $('[name="postCode"]').val(detail.postCode);
            $('[name="address"]').val(detail.address);
            $('[name="addressDetail"]').val(detail.addressDetail);
        });
    }
    else {
        $('.title').html('添加收货地址');
    }


    $('body').on('click', '.btn_submit', function () {
        var data = {
            recipients: $.trim($('[name="recipients"]').val()),
            postcode: $.trim($('[name="postCode"]').val()),
            address: $.trim($('[name="address"]').val()),
            addressDetail: $.trim($('[name="addressDetail"]').val())
        };

        if (!data.recipients) {
            mui.toast('请输入收货人');
            return false;
        }

        if (!data.postcode) {
            mui.toast('请输入邮编');
            return false;
        }

        if (!/^\d{6}$/.test(data.postcode)) {
            mui.toast('请输入合法邮编');
            return false;
        }

        if (!data.address) {
            mui.toast('请选择省市区');
            return false;
        }

        if (!data.addressDetail) {
            mui.toast('请输入详细地址');
            return false;
        }
        var editorUrl = '/address/addAddress';
        var tip = '添加';
        if (addressId) {
            editorUrl = '/address/updateAddress';
            tip = '修改';
            data.id = addressId;
        }
        editAddress(data, editorUrl, function () {
            mui.toast(tip + '成功');
            location.href = 'address.html';
        })

    }).on('click','[name="address"]',function () {
        picker.show( function (item) {
            if(item[0].text == item[1].text){
                item[0].text = '';
            }
            $('[name="address"]').val(item[0].text+item[1].text+(item[2].text||''));
        } )
    });
});
//修改，添加请求函数封装
var  editAddress = function (data, url, callback) {
    CT.loginAjax({
        type: 'post',
        url: url,
        data: data,
        beforeSend: function () {
            $('.btn_submit').html('正在提交...');
        },
        success: function (data) {
            callback && callback(data);
        },
        error: function () {
            mui.toast('服务器故障，请联系管理员qq:1286533039');
            $('.btn_submit').html('提交');
        }
    })
}
//查询地址列表
var getUserAddress = function (callback) {
    CT.loginAjax({
        type: 'get',
        url: '/address/queryAddress',
        data: '',
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        },
        error: function () {
            mui.toast('服务器故障，请联系管理员qq:1286533039');
        }
    })
}
