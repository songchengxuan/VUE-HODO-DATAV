 <template>
    <div class="board">
        <div class="board-chart">
            <dv-scroll-board :config="config"/>
        </div>
  </div>
</template>

<script>
import {r2_list} from '../../api/index.js'

export default {
    name: 'ScrollBoard',
    data(){
        return{
            orgData:[],
        }
    },
    computed: {
        config() {
            // 转换数据格式
            var transdata = this.orgData.map(item => {
                // var formattedDate = new Date(item.create_time).toLocaleString(); // 格式化日期时间
                var formattedDate = new Date().toLocaleString(); // 格式化日期时间
                var formattedString = `${formattedDate} &nbsp;&nbsp; 用户: ${item.vip_name},&nbsp;&nbsp;在${item.store_name}，成功购买${item.classification_zhonglei_desc}, 消费${item.business_amount.toFixed(2)}元`;
                return [formattedString];
                });
            // console.log(transdata)
            let config = {
                // header: ['列1', '列2', '列3'],
                data: transdata,
                rowNum: 6,
                headerBGC: 'rgb(13 87 198)',// 表头背景色
                oddRowBGC: 'rgb(0 5 28)',  // 奇数行背景色
                evenRowBGC:	'rgba(32,137,218,0.4)',// 偶数行背景色
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
            this.orgData = await r2_list().then((res)=>{
                return res.data
                });
        },
    },
}
</script>

<style scoped>
.board {
    position: relative;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}
.board-chart{
    margin:auto;
    padding-top: 3.5%;
    width: 95%;
    height: 85%;
}
</style>
