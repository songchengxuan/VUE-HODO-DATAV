<template>
    <div class="echarts">
        <div style="width:200;height:100%" ref="allMap"></div>
        <div class="mapChoose">
            <span v-for="(item,index) in parentInfo" :key="item.code">
                <span class="title" @click="chooseArea(item,index)">{{item.cityName=='全国'?'全国':item.cityName}}</span>
                <span class="icon" v-show="index+1!=parentInfo.length"></span>
            </span>
        </div>
    </div>
</template>

<script>
    import {m1_list} from '../../api/index.js'

    import * as echarts from 'echarts';
    import resize from "./mixins/resize";
    export default {
        name: 'MapView',
        mixins: [resize],
        data() {
            return {
                myCharts: null,
                orgData:[],
                geoJson: {
                    features: []
                },
                parentInfo: [{
                    cityName: "全国",
                    code: 100000
                }],
                timeTitle: ['2022', '2023', '2024']
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            async getData(){
                this.orgData = await m1_list().then((res)=>{
                    return res.data
                    });
                this.getGeoJson(100000);
            },
            getGeoJson(adcode) {
                let that = this;
                AMapUI.loadUI(["geo/DistrictExplorer"], DistrictExplorer => {
                    var districtExplorer = new DistrictExplorer();
                    districtExplorer.loadAreaNode(adcode, function (error, areaNode) {
                        if (error) {
                            console.error(error);
                            return;
                        }
                        let Json = areaNode.getSubFeatures();
                        if (Json.length > 0) {
                            that.geoJson.features = Json;
                        } else if (Json.length === 0) {
                            that.geoJson.features = that.geoJson.features.filter(
                                item => item.properties.adcode == adcode
                            );
                            if (that.geoJson.features.length === 0) return;
                        }
                        that.getMapData();
                    });
                });
            },
            //获取数据
            getMapData() {
                let mapData = {},
                    pointData = {},
                    sum = {}
                this.timeTitle.forEach(item => {
                    mapData[item] = []
                    pointData[item] = []
                    sum[item] = 0
                    // console.log(this.orgData)
                    this.geoJson.features.forEach(j => {
                        // 找到对应的 business_amount
                        let correspondingData = this.orgData.find(data => data.province_name === j.properties.name && data.year_desc === item);
                        let value = correspondingData ? correspondingData.business_amount : 0;
                        // let value = Math.random() * 3000
                        mapData[item].push({
                            name: j.properties.name,
                            value: value,
                            cityCode: j.properties.adcode
                        })
                        pointData[item].push({
                            name: j.properties.name,
                            value: [j.properties.center[0], j.properties.center[1], value],
                            cityCode: j.properties.adcode
                        })
                        sum[item] += value/10000
                    })
                    mapData[item] = mapData[item].sort(function (a, b) {
                        return b.value - a.value
                    });
                })
                this.initEcharts(mapData, pointData, sum)
                // console.log(mapData)
                // console.log(pointData)
                // console.log(sum)
            },
            initEcharts(mapData, pointData, sum) {
                this.myChart = echarts.init(this.$refs.allMap)
                if (this.parentInfo.length === 1) {
                    echarts.registerMap('china', this.geoJson); //注册
                } else {
                    echarts.registerMap('map', this.geoJson); //注册
                }
                var option = {
                    timeline: {
                        data: this.timeTitle,
                        axisType: 'category',
                        autoPlay: true,
                        playInterval: 3000,
                        left: '12%',
                        right: '10%',
                        bottom: '5%',
                        width: '83%',
                        label: {
                            normal: {
                                textStyle: {
                                    color: 'rgb(179, 239, 255)',
                                    fontSize: 24
                                }
                            },
                            emphasis: {
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 24
                                }
                            }
                        },
                        symbolSize: 20,
                        lineStyle: {
                            color: '#8df4f4'
                        },
                        checkpointStyle: {
                            borderColor: '#8df4f4',
                            color: '#53D9FF',
                            borderWidth: 4,
                        },
                        controlStyle: {
                            showNextBtn: true,
                            showPrevBtn: true,
                            normal: {
                                color: '#53D9FF',
                                borderColor: '#53D9FF',
                            },
                            emphasis: {
                                color: 'rgb(58,115,192)',
                                borderColor: 'rgb(58,115,192)',
                            }
                        },
                    },
                    baseOption: {
                        animation: true,
                        animationDuration: 900,
                        animationEasing: 'cubicInOut',
                        animationDurationUpdate: 900,
                        animationEasingUpdate: 'cubicInOut',
                        geo: {
                            map: this.parentInfo.length === 1 ? 'china' : 'map',
                            zoom: 1.3,
                            roam: true,
                            center: this.parentInfo.length === 1 ? ['104', '35'] : false, //当前视角的中心点
                            tooltip: {
                                trigger: 'item',
                                formatter: (p) => {
                                    let val = p.value[2];
                                    if (window.isNaN(val)) {
                                        val = 0;
                                    }
                                    let txtCon =
                                        "<div style='text-align:left'>" + p.name + ":<br />销售额：" + val.toFixed(
                                            2) + '万</div>';
                                    return txtCon;
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    color: "rgb(249, 249, 249)", //省份标签字体颜色
                                    fontSize: 24,
                                    formatter: p => {
                                        switch (p.name) {
                                            case '内蒙古自治区':
                                                p.name = "内蒙古"
                                                break;
                                            case '西藏自治区':
                                                p.name = "西藏"
                                                break;
                                            case '新疆维吾尔自治区':
                                                p.name = "新疆"
                                                break;
                                            case '宁夏回族自治区':
                                                p.name = "宁夏"
                                                break;
                                            case '广西壮族自治区':
                                                p.name = "广西"
                                                break;
                                            case '香港特别行政区':
                                                p.name = "香港"
                                                break;
                                            case '澳门特别行政区':
                                                p.name = "澳门"
                                                break;
                                            default:
                                                break;
                                        }
                                        return p.name;
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    color: '#f75a00',
                                }
                            },
                            itemStyle: {
                                normal: {
                                    areaColor: '#24CFF4',
                                    borderColor: '#53D9FF',
                                    borderWidth: 2.5,
                                    shadowBlur: 20,
                                    shadowColor: 'rgb(58,115,192)',
                                    shadowOffsetX: 7,
                                    shadowOffsetY: 6,
                                },
                                emphasis: {
                                    areaColor: '#8dd7fc',
                                    borderWidth: 2.4,
                                    shadowBlur: 35,
                                }
                            },
                        },
                    },
                    options: []
                }
                this.timeTitle.forEach(item => {
                    var xData = [],
                        yData = []
                    var min = mapData[item][mapData[item].length - 1].value
                    var max = mapData[item][0].value
                    if (mapData[item].length === 1) {
                        min = 0
                    }
                    mapData[item].forEach(c => {
                        xData.unshift(c.name)
                        yData.unshift(c.value)
                    })
                    option.options.push({
                        title: [{
                                left: 'center',
                                top: 20,
                                text: item + this.parentInfo[this.parentInfo.length - 1].cityName +
                                    '年' +
                                    '营业额统计图',
                                textStyle: {
                                    color: 'rgb(179, 239, 255)',
                                    fontSize: 32
                                },
                            },
                            {
                                text: "总营业额：" + sum[item].toFixed(2) + '万',
                                left: 'center',
                                top: '6.5%',
                                textStyle: {
                                    color: '#FFAC50',
                                    fontSize: 52
                                }
                            }
                        ],
                        visualMap: {
                            min: min,
                            max: max,
                            left: '3%',
                            bottom: '5%',
                            calculable: true,
                            seriesIndex: [0],
                            inRange: {
                                color: ['#24CFF4', '#2E98CA', '#1E62AC']
                            },
                            textStyle: {
                                color: '#24CFF4',
                                fontSize: 24
                            }
                        },
                        series: [
                            {
                                name: item + '营业额度',
                                type: 'map',
                                geoIndex: 0,
                                map: this.parentInfo.length === 1 ? 'china' : 'map',
                                roam: true,
                                zoom: 1.3,
                                tooltip: {
                                    trigger: "item",
                                    formatter: p => {
                                        let val = p.value;
                                        if (p.name == '南海诸岛') return
                                        if (window.isNaN(val)) {
                                            val = 0;
                                        }
                                        let txtCon =
                                            "<div style='text-align:left'>" + p.name +
                                            ":<br />营业额：" + val.toFixed(2) + '万</div>';
                                        return txtCon;
                                    }
                                },
                                label: {
                                    normal: {
                                        show: false,
                                    },
                                    emphasis: {
                                        show: false,
                                    }
                                },
                                data: mapData[item],
                            }, 
                            {
                                name: '散点',
                                type: 'effectScatter',
                                coordinateSystem: 'geo',
                                rippleEffect: {
                                    brushType: 'fill'
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#F4E925',
                                        shadowBlur: 20,
                                        shadowColor: '#333'
                                    }
                                },
                                data: pointData[item],
                                // symbolSize: 80,
                                symbolSize: function (val) {
                                    let value = val[2]
                                    if (value == max) {
                                        return 54
                                    }
                                    return 20
                                },
                                showEffectOn: 'render', //加载完毕显示特效
                            },
                        ]
                    })
                })
                this.myChart.setOption(option, true)
                this.myChart.off('click');
                this.myChart.on('click', this.echartsMapClick);
            },
        }
    }
</script>
<style scoped>
.echarts {
    width: 100%;
    height: 100%;
    position: relative;
    /* background: url("../assets/bg1.jpg") no-repeat; */
    background-size: 100% 100%;
}
.mapChoose {
    position: absolute;
    left: 40px;
    top: 80px;
    color: #eee;
}
.title {
    padding: 10px;
    border-top: 2px solid rgba(147, 235, 248, .8);
    border-bottom: 2px solid rgba(147, 235, 248, .8);
    cursor: pointer;
    font-size: 32px;
}
.icon {
    font-family: "simsun";
    font-size: 50px;
    margin: 0 22px;
}
</style>