<template>
  <div>
    <header>
      <el-row>
        <el-col :span="3">
          <div class="title">
            <!--ETA数据分析系统-->
            <!--<img src="../../assets/images/htlogo.png" class="logo" />-->
            <img src="../../assets/images/eta-logo.png" class="logo" />
          </div>
        </el-col>
        <el-col :span="21">
          <el-menu default-active="1" class="topMenu" background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b" mode="horizontal">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="2">消息中心</el-menu-item>
            <el-menu-item index="3">帮助中心</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </header>
    <div class="container">
      <el-row>
        <el-col :span="3" class="subMenu">
          <el-menu default-active="1" background-color="#1d2833" text-color="#fff" active-text-color="#ffd04b"
                   @open="handleOpen" @close="handleClose" :router="true">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-view"></i>日志分析</template>
              <el-menu-item-group>
                <el-menu-item index="1-1" :route="{path:'/LogAnalyze/firewall'}">
                  防火墙攻击分析
                </el-menu-item>
                <el-menu-item index="1-2" :route="{path:'/LogAnalyze/IPS'}">
                  IPS攻击分析
                </el-menu-item>
                <el-menu-item index="1-3" :route="{path:'/LogAnalyze/pwdCracking'}">
                  口令爆破
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-tickets"></i>日志详情</template>
              <el-menu-item-group>
                <el-menu-item index="2-1" :route="{path:'/LogSearch/firewall'}">
                  防火墙攻击日志
                </el-menu-item>
                <el-menu-item index="2-2" :route="{path:'/LogSearch/IPS'}">
                  IPS攻击日志
                </el-menu-item>
                <el-menu-item index="2-3" :route="{path:'/LogSearch/pwdCracking'}">
                  IPS攻击日志
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3-1" @click="jumpDiyUrl1">
              <i class="el-icon-setting"></i>zabbix系统
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="21" class="content">
          <div>
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    jumpDiyUrl1(){
      window.location.href="http://193.112.135.159/zabbix/httpdetails.php?httptestid=2";
    },
    handleClose(){}
  },

}
</script>
<style>

</style>
