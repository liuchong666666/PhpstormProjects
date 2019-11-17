/**自己写的插件-全局函数*/
//创建带有命名空间的函数（创建属于）某一对象的函数
jQuery.array_option = {
    myFunction: function () {
        console.log("array_option中的函数");
        console.log("Hello World");
    },
    myFunction1: function (msg) {
        console.log("array_option中的函数");
        console.log(msg);
    },

};
jQuery.add_array = {
    //加数组中的每一个值
    sum: function (array) {
        var sum = 0;
        for (var i = 0; i < array.length; i++) {
            sum += array[i];
        }
        console.log("for方法");
        console.log(sum);
    },
    sum1: function (array) {
        var sum = 0;
        //$.each(array,function(i,value){})-->$(array).each(function(i,value){});
        /*
        方法一：
        $.each(array,function(i,val){//i是数组的索引，val是数组的各个值
            console.log("索引："+i);
            sum += val;
        });
        */
        /*
        方法二：
        $.each(array,function(i){//i是数组的索引
             sum += array[i];
         });i
         */
        /*
        方法三
         $.each(array,function(){//i是数组的索引
             sum += this;
         });
      */
        $(array).each(function (i) {
            sum += $(array).get(i);
        });
        console.log("each方法");
        return sum;
    }
}