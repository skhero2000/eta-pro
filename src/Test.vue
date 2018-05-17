<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <el-button @click="startHacking">Start</el-button>
      <div class="list-group">
        <router-link to="/login">home</router-link>
        <router-link to="/index">about</router-link>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
