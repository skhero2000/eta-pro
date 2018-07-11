<template>
  <div>
    <div class="searchBlock">
      <span>查询日期：</span>
      <el-date-picker v-model="searchParam.time" type="datetimerange" align="right" unlink-panels range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
      </el-date-picker>
      <span class="ml_10">username：</span>
      <el-input v-model="searchParam.username" placeholder="请输入username"></el-input>
      <el-button class="ml_10" @click="search">查询</el-button>
    </div>
    <div v-if="list.length>0">
      <el-table :data="list" :height="tableHeight" border stripe>
        <el-table-column prop="username" label="username">
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
    <div v-if="!isSearch">
      <div class="searchIcon">
        请选择时间进行查询
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import http from '~/http';

  export default {
    components: {
    },
    methods: {
      getListData(){
        let searchParam = {};
        let time = this.searchParam.time;
        if(time && time.length===2){
          searchParam.beginTime = time[0].getTime()/1000;
          searchParam.endTime = time[1].getTime()/1000;
        }
        searchParam.username = this.searchParam.username;
        let pagination = this.pagination;
        http.post(this.baseUrl + '/log/Catalina/getUserNameList', {searchParam:searchParam, pagination:pagination}).then(function (suc) {
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
      search(){
        let time = this.searchParam.time;
        if(time && time.length===2){
          this.isSearch = true;
        }else{
          this.isSearch = false;
        }
        this.pagination.currentPage = 1;
        this.getListData();
      }
    },
    mounted:function(){
    },
    data () {
      return{
        baseUrl: 'http://' + location.hostname + ':81/eta/public/index.php?s=',
        tableHeight:document.documentElement.clientHeight-200,
        searchParam:{
          time:[],
          username:''
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
        list:[],
        pagination:{
          currentPage:1,
          pageSize:15,
          total:0
        }
      }
    }
  }
</script>
<style scoped>

</style>
