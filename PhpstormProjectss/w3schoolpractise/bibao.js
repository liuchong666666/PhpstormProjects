function $(id){
    return document.getElementById(id);
}
function initial() {
    $("btn_bibao").addEventListener("click", test_bibao, false);
    $("btn_neiqian").addEventListener("click", test_neiqian, false);
    $("btn_test1").addEventListener("click", test1, false);
    $("btn_test2").addEventListener("click", test2, false);
 }
 function test1() {
     var name = "The Window";
     var object={
         name:"My object",
         getNameFunc:function () {
             return function () {
                 alert(this.name);
                 return this.name;
             };
         }
     };
     alert(object.getNameFunc()());
 }
function test2() {
    var name = "The Window";
    var object={ name:"My object",
        getNameFunc:function () {
        var that =this;
            return function () {
                alert(this.name);
                return that.name;
            };
        }
    };
    alert(object.getNameFunc()());
}
function test_bibao() {
$("d1").innerHTML=add1();
}
function test_neiqian() {
    $("d2").innerHTML=add2();
}

//闭包函数
var add1=(function () {
    var counter = 0;
   return function (){
     return   counter += 1;
   }
})();
//内嵌函数
function add2() {
    var a=0;
    function plus() {
        a+=1;
    }
    plus();
    return a;
}

window.addEventListener("load",initial,false);