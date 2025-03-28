import {
    debounce
  } from "@/utils/index.js"
  
  export default {
    data() {
      return {
        myChart: null,
        resizeHandler: null
      }
    },
    mounted() {
      this.resizeHandler = debounce(() => {
        if (this.myChart) {
          this.myChart.resize()
        }
      }, 200)
      this.initResizeEvent();
    },
  
    beforeDestroy() {
      this.destroyResizeEvent()
      if (!this.myChart) {
        return
      }
      this.myChart.dispose()
      this.myChart.off('click')
      this.myChart = null
    },
  
    activated() {
      this.initResizeEvent()
    },
  
    deactivated() {
      this.destroyResizeEvent()
    },
  
    methods: {
      //监听resize
      initResizeEvent() {
        window.addEventListener('resize', this.resizeHandler)
      },
      //移除resize
      destroyResizeEvent() {
        window.removeEventListener('resize', this.resizeHandler);
      }
    }
}