<template>
  <div>
    <div class="searchBlock">
      <span>查询日期：</span>
      <el-date-picker v-model="searchParam.time" type="daterange" align="right" unlink-panels range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
      </el-date-picker>
      <el-button class="ml_10" @click="search">查询</el-button>
    </div>
    <el-row :gutter="20" >
      <el-col :span="12">
        <div class="chart chart2" id="chart2" :class="{show:pieOptions.legend.data.length>0}"></div>
        <div class="chart" id="chart1"></div>
      </el-col>
      <el-col :span="12">
        <div v-if="list.length>0">
          <el-radio-group v-model="selectedType" @change="changeType">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button v-for="(type,index) in typeArr" :label="type">{{type}}</el-radio-button>
          </el-radio-group>
          <el-table :data="list">
            <el-table-column prop="danger_degree" label="danger_degree" >
            </el-table-column>
            <el-table-column prop="event" label="event">
            </el-table-column>
            <el-table-column prop="src_addr" label="src_addr">
            </el-table-column>
            <el-table-column prop="src_port" label="src_port">
            </el-table-column>
            <el-table-column prop="dst_addr" label="dst_addr">
            </el-table-column>
            <el-table-column prop="dst_port" label="dst_port">
            </el-table-column>
            <el-table-column prop="proto" label="proto">
            </el-table-column>
          </el-table>
          <el-pagination @current-change="currentChange" :currentPage="pagination.currentPage" :total="pagination.total" :pageSize="pagination.pageSize">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <div v-if="!isSearch">
      <div class="searchIcon">
        请选择时间进行查询
      </div>
    </div>
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
      let searchParam = {};
      let time = this.searchParam.time;
      if(time && time.length===2){
        searchParam.beginTime = time[0].getTime()/1000;
        searchParam.endTime = time[1].getTime()/1000+24*60*60;
      }

      http.post('http://localhost:9300/public/index.php/log/Ipstime/getPieData', {searchParam:searchParam}).then(function (suc) {
        console.log({suc:suc});
        if(suc){
          let typeArr = [];
          let data = [];
          suc.map((v,i)=>{
            typeArr.push(v['event']);
            data.push({value:v['count'], name:v['event']})
          });
          this.typeArr = typeArr;
          this.pieOptions.legend.data=typeArr;
          this.pieOptions.series[0].data=data;
          this.chart2.setOption(this.pieOptions);

//          this.chart1.setOption(this.lineOptions);
        }
      }.bind(this))
    },
    getColumnData(){
      let param = {};
      let time = this.searchParam.time;
      if(time && time.length===2){
        param.beginTime = time[0].getTime()/1000;
        param.endTime = time[1].getTime()/1000+24*60*60;
      }

      http.post('http://localhost:9300/public/index.php/log/Ipstime/getColumnData', {searchParam:param}).then(function (suc) {
        if(suc && suc.length){
          let xAxis = [], series=[], legend =[];
          suc.map((v,i)=>{
            xAxis.push(v['label']);
            if(v['value'] && v['value'].length>0){
              v['value'].map((vv,vi)=>{
                let flag = true;
                series.map((sv,si)=>{
                  if(sv['name'] === vv['event']){
                    flag = false;
                  }
                });
                if(flag){
                  legend.push(vv['event']);
                  series.push({
                    name: vv['event'],
                    type: 'line',
                    data: []
                  })
                }
              })
            }
          });

          suc.map((v,i)=>{
            series.map((sv,si)=>{
              if(v['value'] && v['value'].length>0){
                let flag = true, index=-1;
                v['value'].map((vv,vi)=>{
                  if(sv['name'] === vv['event']){
                    flag = false;
                    index = vi;
                  }
                });
                if(flag){
                  sv['data'].push(0);
                }else{
                  sv['data'].push(v['value'][index]['count']);
                }
              }else{
                sv['data'].push(0);
              }
            });

          });

          console.log({xAxis, series, legend});
          this.lineOptions.legend.data=legend;
          this.lineOptions.xAxis.data=xAxis;
          this.lineOptions.series=series;
//
          this.chart1.setOption(this.lineOptions);
        }
      }.bind(this))
    },
    getListData(){
      let searchParam = {};
      let time = this.searchParam.time;
      if(time && time.length===2){
        searchParam.beginTime = time[0].getTime()/1000;
        searchParam.endTime = time[1].getTime()/1000+24*60*60;
      }
      searchParam.type = this.selectedType;
      let pagination = this.pagination;
      http.post('http://localhost:9300/public/index.php/log/Ipstime/getList', {searchParam:searchParam, pagination:pagination}).then(function (suc) {
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
    checkedType(param){
      console.log({param:param});
      this.selectedType = param.name;
      this.changeType();
    },
    initChart(){
      this.chart1 = echarts.init(document.getElementById('chart1'));
      this.chart2 = echarts.init(document.getElementById('chart2'));
      this.chart2.on("click", this.checkedType);
    },
    search(){
      let time = this.searchParam.time;
      if(time && time.length===2){
        this.isSearch = true;
      }else{
        this.isSearch = false;
      }
      this.pagination.currentPage = 1;
      this.getPieData();
      this.getColumnData();
      this.getListData();
    }
  },
  mounted:function(){
    this.initChart();
//    this.getPieData();
//    this.getColumnData();
//    this.getListData();
  },
  data () {
    return{
      searchParam:{
        time:[]
      },
      isSearch:false,
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
        pageSize:8,
        total:0
      },
      typeArr:[],
      chart1:'',
      chart2:'',
      lineOptions:{
        title: {
        },
        tooltip: {},
        legend: {
          data:[]
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: []
      },
      pieOptions:{
        title : {
          text: 'IPS事件类型分布TOP10',
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
            label: {
              normal: {
                show: false
              }
            },
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
  .chart2{  height: 450px; margin: 0 auto; width: 100%;}
</style>
