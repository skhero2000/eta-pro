<template>
  <div>
    <div class="chart" id="chart1"></div>
    <div class="chart chart2" id="chart2"></div>
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
//      let postData = {
//        token:'gh_e8a7b9983c24',
//        url:'https://ht-jj-h5-test.htmimi.com/'
//      };
//      http.post('https://ht-mjwx-test.htmimi.com/index.php/Api/Wxapi/JsSignPackage', postData).then(function (suc) {
//        console.log({suc:suc});
//      })
    },
    getPieData(){
      http.post('http://localhost:9300/public/index.php/log/Index/getData', {}).then(function (suc) {
        console.log({suc:suc});
      })
    },
    change(){
      this.chart2Options.title.text = 'asdasd';
      this.chart2.setOption(this.chart2Options);
    },
    eConsole(param){
      console.log({param:param});
    },
    initChart(){
      this.chart1 = echarts.init(document.getElementById('chart1'));
      this.chart2 = echarts.init(document.getElementById('chart2'));
      this.chart1.setOption(this.chart1Options);
      this.chart2.setOption(this.chart2Options);
      this.chart2.on("click", this.eConsole);
    }
  },
  mounted:function(){
    this.initChart();
    this.getPieData();
  },
  data () {
    return{
      chart1:'',
      chart2:'',
      chart1Options:{
        title: {
          text: 'ECharts'
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
          name: '销量1',
          type: 'bar',
//          itemStyle:{
//            normal:{
//              color:'#4ad2ff'
//            }
//          },
          data: [5, 20, 36, 10, 10, 20]
        },{
          name: '销量2',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      },
      chart2Options:{
        title : {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'},
              {value:234, name:'联盟广告'},
              {value:135, name:'视频广告'},
              {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  }
}
</script>
<style scoped>
  .chart2{ width: 500px; height: 500px; margin: 0 auto;}
</style>
