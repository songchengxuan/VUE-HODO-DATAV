<template>
    <div class="scroll">
        <div class="chart-name">
            门店实时销售排行
        <dv-decoration-3 style="width:200px;height:20px;" />
        </div>
        <div class="scroll-chart">
            <dv-scroll-ranking-board :config="config" />
        </div>
  </div>
</template>

<script>
import {r1_list} from '../../api/index.js'

export default {
    name: 'ScrollRank',
    data() {
        return{
            orgData:[],
        }
    },
    computed: {
        config() {
            // 转换数据格式
            var transdata = this.orgData.map(item => ({
                name: item.store_name,
                value: item.business_amount
                }));
            // console.log(transdata)
            let config = {
                data:transdata,
                unit: '元', // 数值单位
                rowNum: '8', // 行数
                // waitTime: 200000,
            };
            return config
        }
    },
    mounted() {
        this.getData();
    },
    methods:{
        async getData(){
            this.orgData = await r1_list().then((res)=>{
                return res.data
                });
        },
    },
}
</script>

<style scoped>
.scroll {
    position: relative;
    padding: 0 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
.scroll-chart{
    margin:auto;
    padding-top: 12%;
    width: 90%;
    height: 88%;
}
</style>
