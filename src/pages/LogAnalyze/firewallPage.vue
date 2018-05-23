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
          <el-table-column prop="hostname" label="hostname" >
          </el-table-column>
          <el-table-column prop="Receive_interface" label="Receive_interface">
          </el-table-column>
          <el-table-column prop="Receive_interface" label="Receive_interface">
          </el-table-column>
          <el-table-column prop="from_ip" label="起始IP">
          </el-table-column>
          <el-table-column prop="to_ip" label="访问IP">
          </el-table-column>
          <el-table-column prop="begin_time" label="开始时间">
          </el-table-column>
          <el-table-column prop="end_time" label="结束时间">
          </el-table-column>
          <el-table-column prop="total_packets" label="total_packets">
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
    getPieData(){
      http.post('http://localhost:9300/public/index.php/log/Index/getData', {}).then(function (suc) {
        console.log({suc:suc});
        if(suc && suc.length){
          let typeArr = [];
          let data = [];
          suc.map((v,i)=>{
            typeArr.push(v['AttackType']);
            data.push({value:v['count'], name:v['AttackType']})
          });
          this.typeArr = typeArr;
          this.pieOptions.legend.data=typeArr;
          this.pieOptions.series[0].data=data;
          this.chart2.setOption(this.pieOptions);
        }
      }.bind(this))
    },
    getListData(){
      let searchParam = {};
      let time = this.searchParam.time;
      if(time && time.length===2){
        searchParam.beginTime = time[0].getTime()/1000;
        searchParam.endTime = time[1].getTime()/1000;
      }
      searchParam.type = this.selectedType;
      let pagination = this.pagination;
      http.post('http://localhost:9300/public/index.php/log/Index/getList', {searchParam:searchParam, pagination:pagination}).then(function (suc) {
        if(suc && suc.list){
          this.list = suc.list;
          this.pagination.total = suc.pagination.total;
        }
      }.bind(this))
    },
    currentChange(index){
      let pagination = this.pagination;
      pagination.currentPage = parseInt(index);
      this.getListData();
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
//      this.chart1.setOption(this.chart1Options);
//      this.chart2.setOption(this.pieOptions);
//      this.chart2.on("click", this.eConsole);
    },
    search(){

      this.getListData();
    }
  },
  mounted:function(){
    this.initChart();
    this.getPieData();
    this.getListData();
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
      pieOptions:{
        title : {
          text: '防火墙攻击类型分布',
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
          data: []
        },
        series : [
          {
            name: '类型',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
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
