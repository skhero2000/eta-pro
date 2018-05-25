<template>
  <div>
    <div class="searchBlock">
      <span>查询日期：</span>
      <el-date-picker v-model="searchParam.time" type="daterange" align="right" unlink-panels range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
      </el-date-picker>
      <el-button class="ml_10" @click="search">查询</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="chart chart2" id="chart2"></div>
        <div class="chart" id="chart1"></div>
      </el-col>
      <el-col :span="12">
        <el-radio-group v-model="selectedType" @change="changeType">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button v-for="(type,index) in typeArr" :label="type">{{type}}</el-radio-button>
        </el-radio-group>
        <el-table :data="list">
          <el-table-column prop="name" label="姓名" >
          </el-table-column>
          <el-table-column prop="sex" label="性别">
          </el-table-column>
          <el-table-column prop="tel" label="电话">
          </el-table-column>
          <el-table-column prop="age" label="年龄">
          </el-table-column>
          <el-table-column prop="email" label="email">
          </el-table-column>
        </el-table>
        <el-pagination @current-change="currentChange" :currentPage="pagination.currentPage" :total="pagination.total" :pageSize="pagination.pageSize">
        </el-pagination>
      </el-col>
    </el-row>


  </div>
</template>

<script type="text/ecmascript-6">
import echarts from 'echarts';
import http from '~/http';
import {trimStr} from '~/util/filter';

export default {
  components: {
  },
  methods: {
    currentChange(index){
      let pagination = this.pagination;
      pagination.currentPage = parseInt(index);
    },
    changeType(label){
      this.pagination.currentPage = 1;
      this.getListData();
    },
    eConsole(param){
      console.log({param:param});
    },
    initChart(){
      this.chart1 = echarts.init(document.getElementById('chart1'));
      this.chart2 = echarts.init(document.getElementById('chart2'));
      this.chart1.setOption(this.chart1Options);
      this.chart2.setOption(this.pieOptions);
      this.chart2.on("click", this.eConsole);
    },
    search(){

    }
  },
  mounted:function(){
    this.initChart();
//    this.getPieData();
//    this.getListData();
  },
  data () {
    return{
      searchParam:{
        time:[]
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      selectedType:'all',
      list:[],
      pagination:{
        currentPage:1,
        pageSize:10,
        total:0
      },
      typeArr:[],
      chart1:'',
      chart2:'',
      chart1Options:{
        title: {
          text: 'ECharts',

        },
        tooltip: {},
        legend: {
          data:['销量1', '销量2']
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
          data: [15, 10, 30, 5, 8, 13]
        }]
      },
      pieOptions:{
        title : {
          text: '饼图',
          subtext: '',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['a', 'b','c']
        },
        series : [
          {
            name: '类型',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {name:'a', value:1},
              {name:'b', value:2},
              {name:'c', value:3}
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
