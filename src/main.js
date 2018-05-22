import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
//import VueResource from 'vue-resource';
import axios from 'axios'
import router from './Router/index.js';
import * as customFilter from './util/filter.js'

/*过滤器*/
Object.keys(customFilter).forEach(key => {
  Vue.filter(key, customFilter[key])
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios;
Vue.use(ElementUI);
//Vue.use(VueResource);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});