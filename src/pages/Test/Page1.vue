<template>
  <div>
    <div class="chart" id="homeChart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import echarts from 'echarts';
import http from '~/http';

export default {
  components: {
  },
  methods: {
    test(){
      let postData = {
        token:'gh_e8a7b9983c24',
        url:'https://ht-jj-h5-test.htmimi.com/'
      };
      http.post('https://ht-mjwx-test.htmimi.com/index.php/Api/Wxapi/JsSignPackage', postData).then(function (suc) {
        console.log({suc:suc});
      })
    },
    initChart(){
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
    }
  },
  mounted:function(){
    this.initChart();
    this.test();
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
