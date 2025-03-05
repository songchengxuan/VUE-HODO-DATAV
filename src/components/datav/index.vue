<template>
  <div id="smc-view">
    <dv-full-screen-container>
      <div class="header-view"><Top-Header /></div>
      <dv-border-box-1 class="smc-container">
        <div class="mc-left">
          <dv-border-box-6 class="mc-left-1"><Butter-Fly /></dv-border-box-6>
          <dv-border-box-6 class="mc-left-2"><Line-Chart /></dv-border-box-6>
          <dv-border-box-6 class="mc-left-3"><Bar-Chart /></dv-border-box-6> 
        </div>
        <div class="mc-right">
          <dv-border-box-12 class="mc-right-1"><Map-View /></dv-border-box-12>
          <dv-border-box-6 class="mc-right-2"><Scroll-Rank /></dv-border-box-6>
          <dv-border-box-6 class="mc-right-3"><Funnel-Chart /></dv-border-box-6>
          <dv-border-box-13 class="mc-right-4"><Scroll-Board /></dv-border-box-13>
        </div>
      </dv-border-box-1>
    </dv-full-screen-container>
  </div>
</template>

<script>
import TopHeader from './TopHeader'
import ButterFly from './ButterFly'
import LineChart from './LineChart'
import MapView from './MapView'
import BarChart from './BarChart'
import ScrollRank from './ScrollRank'
import ScrollBoard from './ScrollBoard'
import CapChart from './CapChart'
import FunnelChart from './FunnelChart'

export default {
  name:"smcview",
  data(){
    return{
        test1:true,
        test2:false,
        direction: "slide-right"
    };
  },
  components: {
    TopHeader,
    ButterFly,
    LineChart,
    MapView,
    BarChart,
    ScrollRank,
    ScrollBoard,
    CapChart,
    FunnelChart,
  },
}
</script>

<style scoped>
@import "../../assets/css/datav.css";
</style>