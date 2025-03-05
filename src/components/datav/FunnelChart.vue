<template>
  <div class="funnel">
    <div class="chart-name">
        会员等级分布图
        <dv-decoration-3 style="width:400px;height:40px;" />
    </div>
    <div id="funnelChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {m2_list} from '../../api/index.js'

export default {
  name: 'FunnelChart',
  data () {
    return {
        orgData:[],
    }
  },
  mounted(){
    this.getData();
  },
  computed:{
    option() {
        //缩放比例配置
        var scale = 2;
        // 总会员数
        var totalVipNum = this.orgData.reduce((sum, item) => sum + item.total_vip_num, 0);
        //真实数据
        // var ecahrtData = [
        //     {value: 6.7, name: "皇冠会员"},
        //     {value: 13.4,name: "钻石会员"},
        //     {value: 20.1,name: "黄金会员"},
        //     {value: 26.8,name: "白银会员"},
        //     {value: 33.3,name: "普通会员"},
        // ];

        //数据配置形成金字塔形状固定
        var data = this.orgData.map(item => {
            var percentage = (item.total_vip_num/totalVipNum*100).toFixed(1); // 计算百分比并保留一位小数
            return {
                value: parseFloat(percentage), // 转为浮点数
                name: item.grade_name
            };
        });
        // var data = [
        //     {value: 6.7, name: "皇冠会员"},
        //     {value: 13.4,name: "钻石会员"},
        //     {value: 20.1,name: "黄金会员"},
        //     {value: 26.8,name: "白银会员"},
        //     {value: 33.3,name: "普通会员"},
        // ];

        //富文本配置
        var rich = {
            yellow: {
                color: "#ffc72b",
                fontSize: 13 * scale,
                padding: [0, 0],
            },
            blue: {
                color: "rgb(60 157 233)",
                fontSize: 13 * scale,
                padding: [0, 0],
            },
            white: {
                color: "#fff",
                align: "left",
                fontSize: 13 * scale,
                padding: [0, 0],
            },
            // tip: {
            //     color: "#ffc72b",
            //     fontSize: 32 * scale,
            // },
        };
        //颜色配置
        var color = [
        // 最顶端
        {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
            {
                offset: 0,
                // color: "rgba(167,36,93,0.1)", // 0% 处的颜色
                color: "rgba(10,146,149,0.1)"
            },
            {
                offset: 1,
                // color: "rgba(167,36,93,0.4)", // 100% 处的颜色
                color: "rgba(11,174,178,0.5)"
            },
            ],
            globalCoord: false, // 缺省为 false
        },
        // 第二端
        {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
            {
                offset: 0,
                // color: "rgba(167,36,93,0.4)", // 0% 处的颜色
                color: "rgba(11,174,178,0.5)"
            },
            {
                offset: 1,
                // color: "rgba(167,36,93,0.7)", // 100% 处的颜色
                color: "rgba(13,193,198,0.7)"
            },
            ],
            globalCoord: false, // 缺省为 false
        },
        // 第三端
        {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
            {
                offset: 0,
                // color: "rgba(167,36,93,0.7)", // 0% 处的颜色
                color: "rgba(13,193,198,0.7)"
            },
            {
                offset: 1,
                // color: "rgba(167,36,93,0.9)", // 100% 处的颜色
                color: "rgba(14,211,216,0.8)"
            },
            ],
            globalCoord: false, // 缺省为 false
        },
        // 第四端
        {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
            {
                offset: 0,
                // color: "rgba(167,36,93,0.9)", // 0% 处的颜色
                color: "rgba(14,211,216,0.85)"
            },
            {
                offset: 1,
                color: "rgba(15,225,231,0.95)", // 100% 处的颜色
            },
            ],
            globalCoord: false, // 缺省为 false
        },
        // 第五端
        {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
            {
                offset: 0,
                color: "rgba(15,225,231,0.95)", // 0% 处的颜色
            },
            {
                offset: 1,
                color: "rgba(17,239,245,1)", // 100% 处的颜色
            },
            ],
            globalCoord: false, // 缺省为 false
        },
        ];

        let option = {
        // legend: {
        //     formatter: function (name) {
        //         var sum = 0; //各科正确率总和
        //         var averagePercent; //综合正确率
        //         ecahrtData.forEach(function (value, index, array) {
        //             sum += value.value;
        //         });
        //         averagePercent = (sum / ecahrtData.length).toFixed(2);
        //         return (
        //             "{tip|" + averagePercent + "%}{white|" + "  " + "( 整体未通过率 )" + "}"
        //         );
        //     },
        //     data: [ecahrtData[0].name],
        //     // data: ['高等教育学'],
        //     itemGap: 50,
        //     left: "center",
        //     top: "5%",
        //     icon: "none",
        //     textStyle: {
        //         color: "#fff",
        //         fontSize: 16 * scale,
        //         rich: rich,
        //     },
        // },
        calculable: true,
        color: color,
        series: [
            {
            name: "金字塔",
            type: "funnel",
            left: "7%",
            top: "24%",
            bottom: "5%",
            width: "62%",
            sort: "ascending",
            funnelAlign: "center",
            gap: 8 * scale,
            label: {
                normal: {
                show: true,
                position: "right",
                // textStyle: {
                //     fontSize: 16 * scale
                // },
                formatter: function (params) {
                    var percent = 0;
                    data.forEach(function (value, index, array) {
                    if (params.name == value.name) {
                        percent = value.value;
                    }
                    });

                    return (
                        "{yellow|" +
                        percent +
                        "}{white|%}\n{circle|}\n{blue|" +
                        params.name +
                        "}"
                    );
                },
                rich: rich,
                },
            },
            labelLine: {
                normal: {
                length: 45 * scale,
                lineStyle: {
                    width: 2 * scale,
                    type: "solid",
                    color: "#093a50",
                },
                },
            },
            itemStyle: {
                normal: {
                borderColor: "#fff",
                borderWidth: 0,
                },
            },
            data: data,
            },
        ],
};

        return option
    }
  },
  methods:{
    drawLine(){
        this.funnelChart = echarts.init(document.getElementById('funnelChart'));//获取容器元素
        //防止越界，重绘canvas
        window.onresize = funnelChart.resize;
        this.funnelChart.setOption(this.option);//设置option
    },
    async getData(){
        this.orgData = await m2_list().then((res)=>{
            return res.data
        });
        this.drawLine();
    },
  }
}
</script>

<style>
.funnel {
    position: relative;
    /* padding-top: 5%; */
    width: 100%;
    height: 95%;
}
</style>
