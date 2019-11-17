window.CT = {};//全局变量
// var CT = {};
CT.getParamsByUrl = function () {//挂载方法给CT对象
    /*以对象存储地址栏信息*/
    var params = {};
    var search = location.search;//"?key=1"//可以在console控制台直接敲locaton 看里面的信息 然后再locaton.search
    if (search) {
        search = search.replace('?', '');//"key=1"
        //这是一个键值对的情况
        //var arr= search.split('=');//["key","1"]//以等号分隔
        //如果有多个键值对
        var arr = search.split('&');
        arr.forEach(function (item, i) {
            var itemArr = item.split('=');//["key","value"]   itemArr[0] 就是key    itemArr[1]就是value
            params[itemArr[0]] = itemArr[1];//然后将上面截取到键值对  赋值给params对象
        })

    }
    //如果没有search，就返回空的
    // console.log(params);
    return params;
};
/*JSON对象 IE 6.7 有兼容问题  用json2.js插件来解决*/
CT.serialize2Object = function (serializeStr) {
    var obj={};
    /*key=value&k=v"==转为==> {key:value,k:v}*/
    if (serializeStr) {
        var arr=serializeStr.split('&');
        arr.forEach(function (item,i) {//forEach遍历数组  //each 可遍历对象、可遍历数组、jQuery集合
            var itemArr=item.split('=');
            obj[itemArr[0]]=itemArr[1];
        });
    }
    return obj;
};
CT.getItemById = function (arr,id) {
  var obj = null;
  arr.forEach(function (item,i) {
      if(item.id == id){
          obj = item;
      }
  });
  return obj;
};
/*需要登录的ajax请求  登录拦截：用后台返回的数据判断是否登录*/
CT.loginUrl = '/m/user/login.html';//用绝对地址 可以省略掉域名和端口号
CT.cartUrl = '/m/user/cart.html';
CT.userUrl = '/m/user/index.html';
CT.loginAjax = function (params) {
    /*params=====>{ }*/
    $.ajax({
        type: params.type || 'get',
        url: params.url || '#',
        data: params.data || '',
        dataType: params.dataType || 'json',
        beforeSend:function(){
            params.beforeSend && params.beforeSend();
        },
        success: function (data) {
            /*未登录的处理 {error: 400, message: "未登录！"}
            所有的需要登陆的接口 没有登陆返回这个数据*/
            if (data.error == 400) {
                // 跳到登陆页面 把当前地址传给登录页面 当登录成功按照这个地址跳回来
                location.href = CT.loginUrl + '?returnUrl=' + location.href;//location.href当前地址，因为跳到登录页面登录成功后还要返回当前页面
                return false;
            } else {
                params.success && params.success(data);
            }

        },
        error: function () {
            mui.toast('服务器繁忙');
        }

    });
};

/*取与存历史记录*/


//增加记录
CT.addLocalData = function (key) {
    var list =CT.getLocalData();
    //如果和记录中的重复 就将旧的删除  增加新的
    $.each(list,function (i,item) {
        if(item == key){
            list.splice(i,1);
        }
    });
    list.push(key);
    //最多10条 超出了的 只保留最新的10条
    if(list.length>10){
        list.splice(0,list.length-10);
    }
    localStorage.setItem("searchData",JSON.stringify(list));
};
//获得数据
CT.getLocalData = function () {
    // console.log(JSON.parse(localStorage.getItem("searchData")||'[]'));
    return JSON.parse(localStorage.getItem("searchData")||'[]');
};
//删除数据
CT.delLocalData = function (key) {
    var list = CT.getLocalData();
    $.each(list,function (i,item) {
        if(item == key){
            list.splice(i,1);//从数组中删除
        }
    });
    localStorage.setItem("searchData",JSON.stringify(list));
};
//清空 localStorage.clear();