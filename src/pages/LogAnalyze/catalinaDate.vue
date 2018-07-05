<template>
  <div>
    <div class="searchBlock">
      <span>查询日期：</span>
      <el-date-picker v-model="searchParam.time" type="datetimerange" align="right" unlink-panels range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
      </el-date-picker>
      <el-button class="ml_10" @click="search">查询</el-button>
    </div>
    <el-row :gutter="20" :class="{hide:!isSearch}">
      <el-col :span="12">
        <div class="chart chart2" id="chart2" :class="{show:pieOptions.legend.data.length>0}"></div>
        <div class="chart chart2" id="chart1"></div>
      </el-col>
      <el-col :span="12">
        <div class="mb_20">
          <span>filename：</span>
          <el-select v-model="selectedType" placeholder="请选择" @change="changeType">
            <el-option key="all" label="全部" value="all">
            </el-option>
            <el-option v-for="(type,index) in typeArr" :key="type" :label="type" :value="type">
            </el-option>
          </el-select>
        </div>
        <el-tabs v-model="activeName"  type="border-card">
          <el-tab-pane label="告警统计" name="first">
            <div class="alarmPart">
              <div>
                <span>统计字段：</span>
                <el-select v-model="selectedField" placeholder="请选择" @change="changeField">
                  <el-option v-for="(type,index) in fieldArr" :key="type" :label="type" :value="type">
                  </el-option>
                </el-select>
              </div>
              <el-table :data="fieldList">
                <el-table-column :prop="selectedField" :label="selectedField" >
                </el-table-column>
                <el-table-column prop="count" label="次数">
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-model="activeName"  type="border-card" class="mt_10">
          <el-tab-pane label="日志分析" name="first">
            <div v-if="list.length>0">
              <el-table :data="list">
                <el-table-column prop="filename" label="filename">
                </el-table-column>
                <el-table-column prop="line" label="line" >
                </el-table-column>
                <el-table-column prop="loglevel" label="loglevel">
                </el-table-column>
                <el-table-column prop="scheduling" label="scheduling">
                </el-table-column>
                <el-table-column prop="result" label="result" >
                </el-table-column>
                <el-table-column prop="time" label="time">
                </el-table-column>
              </el-table>
              <el-pagination @current-change="currentChange" :currentPage="pagination.currentPage" :total="pagination.total" :pageSize="pagination.pageSize">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>

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
        searchParam.endTime = time[1].getTime()/1000;
      }

      http.post(this.baseUrl + '/log/Catalina/getPieData', {searchParam:searchParam}).then(function (suc) {
        console.log({suc:suc});
        if(suc){
          let typeArr = [];
          let data = [];
          suc.map((v,i)=>{
            typeArr.push(v['filename']);
            data.push({value:v['count'], name:v['filename']})
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
        param.endTime = time[1].getTime()/1000;
      }

      http.post(this.baseUrl + '/log/Catalina/getColumnData', {searchParam:param}).then(function (suc) {
        if(suc && suc.length){
          let xAxis = [], series=[], legend =[];
          suc.map((v,i)=>{
            xAxis.push(v['label']);
            if(v['value'] && v['value'].length>0){
              v['value'].map((vv,vi)=>{
                let flag = true;
                series.map((sv,si)=>{
                  if(sv['name'] === vv['filename']){
                    flag = false;
                  }
                });
                if(flag){
                  legend.push(vv['filename']);
                  series.push({
                    name: vv['filename'],
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
                  if(sv['name'] === vv['filename']){
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
    getFieldListData(){
      let searchParam = {};
      let time = this.searchParam.time;
      if(time && time.length===2){
        searchParam.beginTime = time[0].getTime()/1000;
        searchParam.endTime = time[1].getTime()/1000;
      }
      searchParam.field = this.selectedField;
      searchParam.type = this.selectedType;
      http.post(this.baseUrl + '/log/Catalina/getFieldList', {searchParam:searchParam}).then(function (suc) {
        if(suc){
          this.fieldList = suc;
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
      http.post(this.baseUrl + '/log/Catalina/getList', {searchParam:searchParam, pagination:pagination}).then(function (suc) {
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
    /*日志-改变类型*/
    changeType(label){
      this.pagination.currentPage = 1;
      this.getListData();
      this.getFieldListData();
    },
    /*告警-改变字段*/
    changeField(label){
      this.getFieldListData();
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
      this.getFieldListData();
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
      baseUrl: 'http://' + location.hostname + ':81/eta/public/index.php?s=',
      activeName:'first',
      fieldArr:['line','loglevel','scheduling','result'],
      selectedField:'line',
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
          text: '爆破账户占比排名top10',
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
