<template>
  <div class="line">
    <div class="chart-name">
      连锁公司周营业额
      <dv-decoration-3 style="width:400px;height:40px;" />
    </div>
    <dv-charts :option="option" />
  </div>
</template>

<script>
import {l2_list} from '../../api/index.js'

export default {
  name: 'LineChart',
  data () {
    return {
      orgData:[],
    }
  },
  computed: {
    option() {
      var colorLegend = ['#7e51e9', '#3de7c9', '#f5d94e', '#f07f7f']
      var colorSeries = ['rgba(55, 162, 218, 0.6)', 'rgba(55, 162, 218, 0)']
      // 提取连锁公司
      var branchName = [...new Set(this.orgData.map(item => item.branch_name))];
      // 提取日期，去重排序
      var dates = [...new Set(this.orgData.map(item => item.sdate_md))].sort();
      // 构建金额组
      var businessAmout = branchName.map(branch => {
        return dates.map(date => {
          var record = this.orgData.find(item => item.branch_name === branch&&item.sdate_md === date);
          return record ? record.business_amount : 0; // 若没有记录则填充为0
        });
      });
      var myData = {
          name: ['一公司','二公司','三公司','西区公司'],
          date: ['01/01','01/02', '01/02'], //保留初始值，不然无法渲染canvas。computed计算属性可以更新
          dc11: businessAmout[0],
          dc12: businessAmout[1],
          dc13: businessAmout[2],
          dc72: businessAmout[3]
      };
      myData.date = dates;
      // 解析
      var legendData = myData.name.map((name, index) => ({
        name: name,
        color: colorLegend[index]
      }));

      var seriesData = [myData.dc11, myData.dc12, myData.dc13, myData.dc72].map((data, index) => ({
        data: data,
        type: 'line',
        name: myData.name[index],
        smooth: true,
        lineArea: {
          show: true,
          gradient: colorSeries
        },
        lineStyle: {
          stroke: colorLegend[index]
        },
        linePoint: {
          radius: 4,
          style: {
            fill: colorLegend[index],
            stroke: 'transparent'
          }
        }
      }));

       // 计算所有系列数据中的最大值
      var allData = [].concat(...[myData.dc11, myData.dc12, myData.dc13, myData.dc72]);
      var maxDataValue = Math.max(...allData);
      var yAxisMax = Math.ceil(maxDataValue / 10) * 11; // 使最大值为10的倍数

      let option = {
        grid: {
          top: "12%",
          bottom: "17%", //也可设置left和right设置距离来控制图表的大小
        },
        legend: {
          data: legendData,
          bottom: "5%",
          textStyle: {
            fill: '#FFFFFF',
            fontSize: 24
          }
        },
        xAxis: {
          data: myData.date,
          boundaryGap: false,
          axisLine: {
            style: {
              stroke: '#FFFFFF'
            }
          },
          axisLabel: {
            style: {
              fill: '#FFFFFF',
              fontSize: 24
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          data: 'value',
          name: "万元",
          nameTextStyle: {
            fill: '#fff',
            fontSize: 24
          },
          splitLine: {
            show: false
          },
          axisLine: {
            style: {
              stroke: '#FFFFFF'
            }
          },
          axisLabel: {
            style: {
              fill: '#FFFFFF',
              fontSize: 24
            },
            formatter ({ value }) {
              return value.toFixed(2)
            }
          },
          axisTick: {
            show: false
          },
          min: 0,
          max: yAxisMax,
          interval: 30
        },
        series: seriesData
      };
      return option
    }
  },
  mounted() {
    this.getData();
  },
  methods:{
    async getData(){
      this.orgData = await l2_list().then((res)=>{
        return res.data
      });
    },
  },
}
</script>

<style>
.line {
    position: relative;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
</style>
