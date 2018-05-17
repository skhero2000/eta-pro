<template>
  <div>
    Login{{ money | money | symbol}}
    <button @click="showData">showData</button>{{diyName}}
    <input type="file" multiple/>
    <input @keyup.space="submit" v-focus>
    <div v-html="message" :id="messageId"></div>
    <div>Computed reversed message: {{reversedMessage}}</div>
    <div>
      <input v-model="question" /> {{question}}
    </div>
    <div :class="{red:isRed}">样式绑定</div>
    <div :class="classObject">多个样式</div>
    <div :class="[class1, class2]">数组样式</div>
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }">style</div>
    <div :style="styleObject">styleObject</div>

    <div v-if="type === 'A'">
      A
    </div>
    <div v-else-if="type === 'B'">
      B
    </div>
    <div v-else-if="type === 'C'">
      C
    </div>
    <div v-else>
      Not A/B/C
    </div>

    <ul>
      <li v-for="(item, index) in items">
        {{ item.message }} -- {{index}}
      </li>
    </ul>

    <p>单个复选框：</p>
    <input type="radio" id="checkbox" v-model="checked" value="手表">
    <label for="checkbox">单个复选框1</label>
    <input type="radio" id="checkbox1" v-model="checked" value="书包">
    <label for="checkbox1">单个复选框2</label>
    <br>
    <span>选择的值为: {{ checked }}</span>

    <p>多个复选框：</p>
    <input type="checkbox" id="runoob" value="Runoob" v-model="checkedNames">
    <label for="runoob">Runoob</label>
    <input type="checkbox" id="google" value="Google" v-model="checkedNames">
    <label for="google">Google</label>
    <input type="checkbox" id="taobao" value="Taobao" v-model="checkedNames">
    <label for="taobao">taobao</label>
    <br>
    <span>选择的值为: {{ checkedNames }}</span>

    <br/> <br/>


    <select v-model="selected" name="fruit">
      <option value="">选择一个网站</option>
      <option v-for="(item, index) in selectList" :value="item.value">{{item.name}}</option>
    </select>
    <div>选择的网站是: {{selected}}</div>


    <s-menu message="abc" :list="selectList" @increment="incrementTotal"></s-menu>

    <button @click="testPost">testPost</button>
  </div>
</template>
<style>
  .red{ color:red;}
  .bold{ font-weight: bold;}
</style>

<script type="text/ecmascript-6">
import Vue from 'vue'
import Menu from '~/component/Menu/index.vue'

export default {
  props:{
    htType:{
      name:'skhero'
    }
  },
  components:{
    'sMenu': Menu
  },
  data: function(){
    return {
      selectList:[
        {name:'水杯', value:11},
        {name:'茶叶', value:22}
      ],
      selected:'',
      checked:'Runoob',
      checkedNames:[],
      items: [
        { message: 'Foo' },
        { message: 'Bar' }
      ],
      type:'B',
      styleObject:{
        color:"red"
      },
      activeColor:'red',
      fontSize:22,
      class1:'red',
      class2:'bold',
      classObject: {
        active: true,
        'text-danger': true
      },
      isRed: false,
      diyName:'ask',
      money: 2500,
      message:"<b>asd</b>",
      messageName:'Hello World',
      messageId:111,
      question:'你好！'
    }
  },

  /*监听*/
  watch: {
    question:function(newQuestion){
      console.log({newQuestion:newQuestion});
      this.message = newQuestion;
    }
  },

  /*定义初始方法*/
  computed:{
    reversedMessage: function () {
      // `this` 指向 vm 实例
      return this.messageName.split('').reverse().join('')
    }
  },

  /*实例被创建之后执行*/
  created:function(){
    console.log('dddd');
  },

  /*定义方法*/
  methods: {
    showData: function(){
      this.diyName='aasdasd';
      console.log(this);
    },
    submit: function(event){
      alert('s');
    },
    incrementTotal: function(obj){
      alert(obj.name);
      console.log({obj:obj});
    },
    testPost: function(){
      this.$http.post('http://localhost/a.json', {}).then(function(suc){}, function(err){});
    }
  },

  /*定义格式化*/
  filters: {
    money: function(value){
      return (value/100).toFixed(2);
    },
    symbol: function (value) {
      return '￥' + value;
    }
  },
  directives:{
    focus: {
      bind: function(e){
        console.log({name:'bind', e:e});
      },
      unbind: function(e){
        console.log({name:'unbind', e:e});
      },
      update: function(e){
        console.log({name:'update', e:e});
      },
      componentUpdated: function(e){
        console.log({name:'componentUpdated', e:e});
      },
      // 指令的定义
      inserted: function (el) {
        console.log({name:'inserted', e:el});
        // 聚焦元素
        el.focus();
      }
    }
  }
}
</script>
