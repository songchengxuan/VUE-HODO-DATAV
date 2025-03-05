<template>
  <div class="bar">
    <div class="chart-name">
      品类营业额
      <dv-decoration-3 style="width:400px;height:40px;" />
    </div>
    <div id="barChart"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {l3_list} from '../../api/index.js'

export default {
  name: 'BarChart',
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
      var myData = {
        type: this.orgData.map(item => item.classification_dalei_desc),
        amount: this.orgData.map(item => item.business_amount/10000),
        corr: this.orgData.map(item => item.business_amount_corr/10000),
        profit: this.orgData.map(item => item.business_profit*100),
      }

      // var myData = {
      //   type: ['衬衫','T恤','裤子','饰品','西服','短裤','西裤'],
      //   amount: [32, 28, 38, 45, 19, 38, 20],
      //   corr: [42, 38, 48, 35, 29, 28, 30],
      //   profit: [42, 38, 48, 35, 29, 28, 50],
      // }

      let option = {
        grid: {
          top: "25%",
          bottom: "18%", //也可设置left和right设置距离来控制图表的大小
        },
        legend: {
          data: ["营业额", "同期", "毛利率"],
          bottom: "4%",
          textStyle: {
            color: "#ffffff",
            fontSize: 24
          },
        },
        xAxis: {
          data: myData.type,
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: "#01FCE3",
            },
          },
          axisTick: {
            show: true, //隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#ebf8ac", //X轴文字颜色
              fontSize: 24
            },
          },
        },
        yAxis: [
          {
            type: "value",
            name: "万元",
            nameTextStyle: {
              color: "#fff",
              fontSize: 24
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: true,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#FFFFFF",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 24
              },
            },
          },
          {
            type: "value",
            name: "毛利率",
            nameTextStyle: {
              color: "#fff",
              fontSize: 24
            },
            position: "right",
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              show: true,
              formatter: "{value} %", //右侧Y轴文字显示
              textStyle: {
                color: "#fff",
                fontSize: 24
              },
            },
            min: 0,
            max: 100,
            interval: 20
          },
        ],
        series: [
          {
            name: "营业额",
            type: "bar",
            barWidth: 30,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "rgb(78 107 218)",
                  },
                  {
                    offset: 1,
                    color: "rgb(95 79 232)",
                  },
                ]),
              },
            },
            data: myData.amount,
          },
          {
            name: "同期",
            type: "bar",
            barWidth: 30,
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#00FFE3",
                  },
                  {
                    offset: 1,
                    color: "#4693EC",
                  },
                ]),
              },
            },
            data: myData.corr,
          },
          {
            name: "毛利率",
            type: "line",
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true, //平滑曲线显示
            showAllSymbol: true, //显示所有图形。
            symbol: "circle", //标记的图形为实心圆
            symbolSize: 20, //标记的大小
            itemStyle: {
              //折线拐点标志的样式
              color: "#e2cc53",
            },
            lineStyle: {
              color: "#e2cc53",
            },
            areaStyle: {
              color: "rgb(246,213,74,0.2)",
            },
            data: myData.profit,
          },
        ],
      };
      return option
    }
  },
  methods:{
    drawLine(){
        this.barChart = echarts.init(document.getElementById('barChart'));//获取容器元素
        //防止越界，重绘canvas
        window.onresize = barChart.resize;
        this.barChart.setOption(this.option);//设置option
    },
    async getData(){
      this.orgData = await l3_list().then((res)=>{
        return res.data
      });
      this.drawLine();
    },
  }
}
</script>

<style>
.bar {
    position: relative;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
</style>
