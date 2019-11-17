/**
 语法("#id")
 参数：selector：选择器，可以是类选择器（#id），类选择器（.class）,标签选择器（element）

 */
//封装id选择器
function $(selector){
    var c=selector.substring(0,1);//取第一个字符
    if(c=='#'){
        return document.getElementById(selector.substring(1,selector.length));
    }
}
/**
 类选择器
 语法：$(".class")s
 */
function $(selector){
    //判断浏览器是否支持getElementsClassName
    var className=selector.substring(1);
    if( document.getElemnetsByClassName){
        return document.getElemnetsByClassName(className);
    }else{
        //document.getElementsByTagName('*')+正则表达式//这里是获取所有标签！
        var reg=new RegExp("(^|\\s)"+className+"($|\\s)");
        var elems=document.getElementsByTagName("*");//这里是获取所有标签！
        var arr=[];//保存获取到的指定className的元素
        for(var i=0;i<elems.length;i++){
            if(reg.test(elems[i].className)){
                arr.push(elems[i]);
            }
        }
        return arr;
    }

}
/**
 标签选择器
 语法：$（"element"）
 */
function $(element){
    return document.getElementsByTagName(element);

}