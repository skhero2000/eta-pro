<template>
  <div class="iframe">
    <iframe ref="iframe":style="{height:height+'px'}" :src="url"></iframe>
  </div>
</template>

<script type="text/ecmascript-6">
import http from '~/http';

export default {
  components: {
  },
  methods: {

  },
  mounted:function(){
    let {params} = this.$route;
    if(params.url){
      this.url = params.url;
    }
  },
  data () {
    return{
      height:document.documentElement.clientHeight-65,
      url:''
    }
  }
}
</script>
<style scoped>
  .iframe{ margin: -10px;}
  .iframe iframe{ width: 100%;}
</style>
