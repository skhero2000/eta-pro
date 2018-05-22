<template>
  <div>
    <header>
      <el-row>
        <el-col :span="3">
          <div class="title">
            <!--ETA数据分析系统-->
            <img src="../../assets/images/htlogo.png" class="logo" />
          </div>
        </el-col>
        <el-col :span="21">
          <el-menu default-active="1" class="topMenu" background-color="#545c64"
                   text-color="#fff"
                   active-text-color="#ffd04b" mode="horizontal">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-menu-item index="2" >消息中心</el-menu-item>
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
              <template slot="title"><i class="el-icon-message"></i>导航一</template>
              <el-menu-item-group>
                <el-menu-item index="1-1" :route="{path:'/index/page1'}">
                  选项1
                </el-menu-item>
                <el-menu-item index="1-2" :route="{path:'/index/page2'}">
                  选项2
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2-1" :route="{path:'/index/page1'}"><i class="el-icon-menu"></i>导航二</el-menu-item>
            <el-menu-item index="3-1" :route="{path:'/index/page2'}"><i class="el-icon-setting"></i>导航三</el-menu-item>
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
    handleOpen(){

    },
    handleClose(){}
  },

}
</script>
<style>

</style>
