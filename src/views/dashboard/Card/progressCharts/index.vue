<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
import *as echarts from 'echarts'
export default {
   name:'progressCharts',
   mounted(){
       let lineCharts = echarts.init(this.$refs.charts);
       lineCharts.setOption({
           xAxis:{
               show:false,
              
           },
           yAxis:{
               show:false,
                type:'category',
           },
           series:[
               {
                  type:'bar',
                  data:[88],
                  color:'yellowgreen',
                  barWidth:10,
                  showBackground: true,
                  backgroundStyle:{
                      color: '#eee'
                  },
                  label:{
                      show:true,
                      formatter:'|',
                      position: "right",
                  }
               }
           ]
       })
   }
}
</script>

<style>
.charts{
    width:100%;
    height:100%;
}
</style>