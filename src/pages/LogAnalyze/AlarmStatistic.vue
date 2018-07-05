<template>
  <div>
    <div class="searchBlock">
      <span>查询日期：</span>
      <el-date-picker v-model="searchParam.time" type="datetimerange" align="right" unlink-panels range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
      </el-date-picker>
      <el-button class="ml_10" @click="search">查询</el-button>
    </div>
    <div :class="{hide:!isSearch}">
      <div class="chart chart2" id="chart1"></div>
      <div v-if="list.length>0">
        <el-table :data="list">
          <el-table-column prop="content" label="告警">
          </el-table-column>
          <el-table-column prop="time" label="时间">
          </el-table-column>
        </el-table>
        <el-pagination @current-change="currentChange" :currentPage="pagination.currentPage" :total="pagination.total" :pageSize="pagination.pageSize">
        </el-pagination>
      </div>
    </div>
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
    getColumnData(){
      let param = {};
      let time = this.searchParam.time;
      if(time && time.length===2){
        param.beginTime = time[0].getTime()/1000;
        param.endTime = time[1].getTime()/1000;
      }

      http.post(this.baseUrl + '/log/Alarmstatistic/getColumnData', {searchParam:param}).then(function (suc) {
        if(suc && suc.length){
          let xAxis = [], series=[], legend =[];
          suc.map((v,i)=>{
            xAxis.push(v['label']);
            if(v['value'] && v['value'].length>0){
              v['value'].map((vv,vi)=>{
                let flag = true;
                series.map((sv,si)=>{
                  if(sv['name'] === vv['account']){
                    flag = false;
                  }
                });
                if(flag){
                  legend.push(vv['account']);
                  series.push({
                    name: vv['account'],
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
                  if(sv['name'] === vv['account']){
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
        searchParam.endTime = time[1].getTime()/1000;
      }
      let pagination = this.pagination;
      http.post(this.baseUrl + '/log/Alarmstatistic/getList', {searchParam:searchParam, pagination:pagination}).then(function (suc) {
        if(suc && suc.list){

          if(suc.list){
            let newList = [];
            suc.list.map((v,i)=>{
              if(v['AttackType']){
                newList.push({content:'AttackType:' + v['AttackType'], time:v['time']});
              }else if(v['event']){
                newList.push({content:'event:' + v['event'], time:v['time']});
              }
            });
            this.list = newList;
          }
          this.pagination.total = suc.pagination.total;
        }
      }.bind(this))
    },
    currentChange(index){
      let pagination = this.pagination;
      pagination.currentPage = parseInt(index);
      this.getListData();
    },

    /*告警-改变字段*/
    changeField(label){
      this.getFieldListData();
    },
    initChart(){
      this.chart1 = echarts.init(document.getElementById('chart1'));
    },
    search(){
      let time = this.searchParam.time;
      if(time && time.length===2){
        this.isSearch = true;
      }else{
        this.isSearch = false;
      }
      this.pagination.currentPage = 1;
      this.getColumnData();
      this.getListData();
    }
  },
  mounted:function(){
    this.initChart();
  },
  data () {
    return{
      baseUrl: 'http://' + location.hostname + ':81/eta/public/index.php?s=',
      activeName:'first',
      fieldArr:['info','rtcode'],
      selectedField:'info',
      fieldList:[],
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
        pageSize:4,
        total:0
      },
      typeArr:[],
      chart1:'',
      chart2:'',
      lineOptions:{
        title: {
        },
        tooltip: {},
        grid: {
          top:'40%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
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
          text: '账户名分布Top10',
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
          top:50,
          width:50,
          data: []
        },
        series : [
          {
            name: '类型',
            type: 'pie',
            radius : '55%',
            x:'right',
            center: ['80%', '40%'],
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

</style>
