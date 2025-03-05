<template>
  <div class="butter">
    <div class="chart-title">
      <dv-decoration-7 style="width:440px;height:60px;">全渠道销售汇总</dv-decoration-7>
    </div>
    <div id="butterChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {l1_list} from '../../api/index.js'

export default {
  name: 'ButterFly',
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
        var colorArr = [
            "#218de0",
            "#01cbb3",
            "#85e647",
            "#5d5cda",
            "#f6d54a",
            "#f845f1",
        ];
        var colorAlpha = [
            "rgba(60,170,211,0.05)",
            "rgba(1,203,179,0.05)",
            "rgba(133,230,71,0.05)",
            "rgba(93,92,218,0.05)",
            "rgba(5,197,176,0.05)",
            "rgba(194,153,39,0.05)",
        ];
        var myProperty = {
            position: ['38%','50%'],
            titlefontsize: 28,
            polarradius: "60%",
            pieradius: "60%",
            length1: 20,
            length2: 30,
        };
        var myData = {
            number: this.orgData.map(item => item.business_amount.toString()),
            titlename: this.orgData.map(item => item.channel)
        }
        // var myData = {
        //     number: ["40", "30", "15", "10", "8"],
        //     titlename: ["门店", "小程序", "天猫", "京东", "其他"],
        // };
        var data = [];
        var total = 0;
        for (var i = 0; i < myData.number.length; i++) {
            total += Number(myData.number[i]);
        }
        for (let index = 0; index < myData.titlename.length; index++) {
            data.push({
                value: myData.number[index],
                name: myData.titlename[index],
                itemStyle: {
                normal: {
                    borderColor: colorArr[index],
                    borderWidth: 4,
                    shadowBlur: 40,
                    shadowColor: colorArr[index],
                    shadowOffsetx: 50,
                    shadowOffsety: 40,
                    color: colorAlpha[index],
                },
                },

                label: {
                    normal: {
                        formatter: ["{b|{b}:{c}万}", "{d|{d}%}"].join("\n"), //join函数将数组中的元素用选择的分隔符拼接成一个字符串
                        rich: {
                        b: {
                            color: colorArr[index],
                            fontSize: myProperty.titlefontsize,
                            lineHeight: 40,
                        },
                        d: {
                            color: "#d0fffc",
                            fontSize: myProperty.titlefontsize, //手动输入的字体大小
                            height: 40,
                            align: "center", //这里是控制文本的位置 此时是居中
                        },
                        },
                    },
                },
            });
        }

        let option = {
            grid: {
                show:false,
                left:'50%',
            },
            legend:{
                orient:"vertical",
                top:"center",
                right:"10%",
                data:[
                    "门店", "小程序", "天猫", "京东", "其他"
                ],
                textStyle:{
                    color:"#fff",
                    fontSize: 25,
                }
            },
            polar: {
                radius: myProperty.polarradius,
                center: myProperty.position,
            },
            angleAxis: {
                interval: 1,
                type: "category",
                data: [],
                z: 10,
                axisLine: {
                show: false,
                lineStyle: {
                    color: "#0B4A6B",
                    width: 1,
                    type: "solid",
                },
                },
                axisLabel: {
                interval: 0,
                show: true,
                color: "#0B4A6B",
                margin: 16,
                fontSize: 32,
                },
            },
            radiusAxis: {
                min: 40,
                max: 240,
                interval: 40,
                axisLine: {
                show: false,
                lineStyle: {
                    color: "#0B3E5E",
                    width: 1,
                    type: "solid",
                },
                },
                axisLabel: {
                formatter: "{value} %",
                show: false,
                padding: [0, 0, 40, 0],
                color: "#0B3E5E",
                fontSize: 32,
                },
                splitLine: {
                lineStyle: {
                    color: "#07385e",
                    width: 4,
                    type: "dashed",
                },
                },
            },

            calculable: true,
            series: [
                {
                    stack: "a",
                    type: "pie",
                    center: myProperty.position,
                    radius: myProperty.pieradius,
                    roseType: "radius",
                    zlevel: 10,
                    startAngle: 100,

                    labelLine: {
                        normal: {
                        show: true,
                        length: myProperty.length1,
                        length2: myProperty.length2,
                        lineStyle: {
                            color: "#0096b1",
                        },
                        },
                        emphasis: {
                        show: false,
                        },
                    },
                    data: data,
                },
            ]
        };
      return option
    }
  },
  methods:{
    drawLine(){
        this.butterChart = echarts.init(document.getElementById('butterChart'));//获取容器元素
        //防止越界，重绘canvas
        window.onresize = butterChart.resize;
        this.butterChart.setOption(this.option);//设置option
    },
    async getData(){
        this.orgData = await l1_list().then((res)=>{
            return res.data
        });
        this.drawLine();
    },
  }
}
</script>

<style>
.butter {
    position: relative;
    padding-top: 8%;
    width: 100%;
    height: 88%;
}
</style>
