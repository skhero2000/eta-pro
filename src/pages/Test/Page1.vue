<template>
  <div>
    <div class="chart" id="homeChart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import echarts from 'echarts'
export default {
  components: {
  },
  methods: {
  },
  mounted:function(){
//      console.log({echarts:echarts})
    let myChart = echarts.init(document.getElementById('homeChart'));
    let options = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
    myChart.setOption(options);
  },
  data () {
    return{
        chartOptions:{
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }
    }
  }
}
</script>
