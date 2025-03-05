<template>
  <div id="top-header">
    <div class="index-nav">
      <div type="text" style="font-size:32px;font-weight:bold;margin-left:8%;">数据更新时间：2023年6月12日</div>
      <div type="text" style="font-size:32px;font-weight:bold;margin-left:62%;">技术支持：信息网络部</div>
    </div>
    <dv-decoration-8 class="header-left-decoration" />
    <dv-decoration-5 class="header-center-decoration" />
    <dv-decoration-8 class="header-right-decoration" :reverse="true" />
    <div class="center-title">红豆股份全渠道数据大屏</div>
  </div>
</template>

<script>
export default {
  name: 'TopHeader',
  data() {
      return {

      };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>
#top-header {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  z-index: 9999;
}

.index-nav{
    width: 100%;
    height: 100px;
    margin-top: 24px;
    position:absolute;
    display: flex;
} 

.header-center-decoration {
    width: 40%;
    height: 60px;
    margin-top: 50px;
}

.header-left-decoration, .header-right-decoration {
    width: 25%;
    margin-top: 20px;
    height: 120px;
}

.center-title {
    position: absolute;
    font-size: 50px;
    font-weight: bold;
    left: 50%;
    top: 15px;
    transform: translateX(-50%);
}
</style>
