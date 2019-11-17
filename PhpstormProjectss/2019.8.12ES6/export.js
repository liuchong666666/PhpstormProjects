/*
let name = 'jack'
let age = 22;
let fun =function () {
    return `姓名：${name},年龄：${age}`
}
let myCLass = class myClass{
    static a = '呵呵'
}
export {name,age,fun,myCLass}
*/

// let name = 'jack';
// export default  name//这个只能传一个

export default {
    name:"lc",
    age:18,
    getInfo(){
        return `姓名：${this.name},年龄：${this.age}`
    }
}