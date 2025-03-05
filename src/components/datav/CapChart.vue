 <template>
    <div class="cap">
        <div class="chart-name">
            会员等级分布图
            <dv-decoration-3 style="width:200px;height:20px;" />
        </div>
        <div class="cap-chart">
            <dv-capsule-chart :config="config" />
        </div>
  </div>
</template>

<script>
export default {
    name: 'CapChart',
    data(){
        return{
            config: {
                data: [
                    {
                        name: '南阳',
                        value: 167
                    },
                    {
                        name: '周口',
                        value: 67
                    },
                    {
                        name: '漯河',
                        value: 123
                    },
                    {
                        name: '郑州',
                        value: 55
                    },
                    {
                        name: '西峡',
                        value: 98
                    },
                ]
            }
        }
    }
}
</script>

<style scoped>
.cap {
    position: relative;
    padding: 0 10px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
.cap-chart{
    margin:auto;
    padding-top: 12%;
    width: 90%;
    height: 88%;
}
</style>
