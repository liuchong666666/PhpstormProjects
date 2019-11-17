$(function () {
    barCharts();
    pieCharts();
});
var barCharts = function () {
    /*获取数据*/
    var data = [
        {
            name: '一月',
            value: 50
        },
        {
            name: '二月',
            value: 100
        },
        {
            name: '三月',
            value: 200
        },
        {
            name: '四月',
            value: 150
        },
        {
            name: '五月',
            value: 450
        }
    ];
    var xdata = [], sdata = [];
    data.forEach(function (item, i) {
        xdata.push(item.name);
        sdata.push(item.value)
    });

    /*1.引入echarts.min.js文件*/
    /*2.找到画图的容器*/
    var box = document.querySelector('.picTable:first-child');//容器
    /*3.初始化插件*/
    var myChart = echarts.init(box);//使用ECharts进行初始化
    /*4.配置参数*/
    var options = {
        title: {
            text: '2019年注册人数'
        },
        legend: {//图形上面的小方格说明
            data: ['注册人数']//这个要和 series中的name相关联
        },
        tooltip: {},
        xAxis: [
            {
                type: 'category',
                data: [data[0].name, 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']//data[0].name这也可以设置值，不推荐
                // axisTick: {    //柱状图每条下面中间的小黑线
                //     alignWithLabel: true
                // }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '注册人数',
                type: 'bar',
                barWidth: '60%',
                data: [data[0].value, 52, 200, 334, 390, 330, 220]
            }
        ]
    };
    options.xAxis[0] = {data: xdata};//两种方法设置数据，以后通过后台拿的数据，就可以这样加进去
    options.series[0].data = sdata;//两种方法设置数据
    /*5.设置参数*/
    myChart.setOption(options);
};
var pieCharts = function () {

    /*1.引入echarts.min.js文件*/
    /*2.找到画图的容器*/
    var box = document.querySelector('.picTable:last-child');//容器
    /*3.初始化插件*/
    var myChart = echarts.init(box);//使用ECharts进行初始化
    /*4.配置参数*/
    var options = {
        title: {
            text: '热门品牌销售',
            subtext: '2019年7月',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            /*series.name a*/
            /*data.name   b*/
            /*data.value  c*/
            /*占比        d*/
            // formatter: "{a} <br/>{b} : {c} ({d}%)"
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['耐克', '阿迪', '百伦', '安踏', '李宁']
        },
        series: [
            {
                name: '销售情况',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [
                    {value: 335, name: '耐克'},
                    {value: 310, name: '阿迪'},
                    {value: 234, name: '百伦'},
                    {value: 135, name: '安踏'},
                    {value: 1548, name: '李宁'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    /*5.设置参数*/
    myChart.setOption(options);
};