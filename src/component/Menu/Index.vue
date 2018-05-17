<template>
  <ul class="menu">
    <li v-for="(item, index) in list" @click="increment(item)">{{item.name}}</li>
  </ul>
</template>

<script type="text/ecmascript-6">
export default {
  props: ['message', 'list'],
  methods: {
    increment: function(obj){
      this.$emit('increment', obj);
    }
  },
  /*实例被创建之后执行*/
  created:function(){
    console.log('aaa');
    console.log(this.list)
  },

}
</script>
<style>
  .menu{}
  .menu>li{ float: left; border: 1px solid #ccc; background-color: #f5f5f5; list-style: none; padding: 0 20px; border-right: 0;}
  .menu>li:last-child{ border-right: 1px solid #ccc;}
  .menu>li.current{ background-color: #fff;}
</style>
