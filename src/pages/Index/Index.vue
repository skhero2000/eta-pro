<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :router="true">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
              <el-menu-item index="1-1" route="/index/page1">
                选项1
              </el-menu-item>
              <el-menu-item index="1-2" route="/index/page2">
                选项2
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2-1" route="/index/page1"><i class="el-icon-menu"></i>导航二</el-menu-item>
          <el-menu-item index="3-1" route="/index/page1"><i class="el-icon-setting"></i>导航三</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="16">
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {

  },

}
</script>
<style>

</style>
