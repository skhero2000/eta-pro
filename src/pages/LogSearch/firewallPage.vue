<template>
  <div>
    <div class="searchBlock">
      <span>查询日期：</span>
      <el-date-picker v-model="searchParam.time" type="datetimerange" align="right" unlink-panels range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2">
      </el-date-picker>
      <span class="ml_10">攻击类型：</span>
      <el-input v-model="searchParam.AttackType" placeholder="请输入AttackType"></el-input>
      <el-button class="ml_10" @click="search">查询</el-button>
    </div>
    <div v-if="list.length>0">
      <!--<el-radio-group v-model="selectedType" @change="changeType">-->
      <!--<el-radio-button label="all">全部</el-radio-button>-->
      <!--<el-radio-button v-for="(type,index) in typeArr" :label="type">{{type}}</el-radio-button>-->
      <!--</el-radio-group>-->

      <el-table :data="list" :height="tableHeight" border stripe>
        <el-table-column prop="hostname" label="hostname" >
        </el-table-column>
        <el-table-column prop="AttackType" label="攻击类型" >
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
      searchParam.AttackType = this.searchParam.AttackType;
      let pagination = this.pagination;
      http.post(this.baseUrl + '/log/Index/getList', {searchParam:searchParam, pagination:pagination}).then(function (suc) {
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
      searchParam:{
        time:[],
        AttackType:''
      },
      isSearch:false,
      list:[],
      pagination:{
        currentPage:1,
        pageSize:20,
        total:0
      }
    }
  }
}
</script>
<style scoped>
</style>
