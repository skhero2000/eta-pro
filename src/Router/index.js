import Vue from 'vue';
import Router  from 'vue-router';
import Login from '~/pages/Login/Login.vue'
import Index from '~/pages/Index/Index.vue'
import Page1 from '~/pages/Test/Page1.vue'
import Page2 from '~/pages/TEST/Page2.vue'
import firewallPage from '~/pages/LogAnalyze/firewallPage.vue'
import IPSPage from '~/pages/LogAnalyze/IPS.vue'
import pwdCrackingPage from '~/pages/LogAnalyze/pwdCracking.vue'
import firewallSearch from '~/pages/LogSearch/firewallPage.vue'
import IPSSearch from '~/pages/LogSearch/IPS.vue'


Vue.use(Router);

export default new Router({
  routes: [
    { path: '*', component: Index },
    { path: '/', component: Index },
    { path: '/login', component: Login },
    { path: '/login/:id', component: Login },
    { path: '/index', component: Index,
      children: [
        {
          path: 'page1',
          component: Page1
        },
        {
          path: 'page2',
          component: Page2
        }
      ]
    },
    { path: '/LogAnalyze', component: Index,
      children: [
        {
          path: 'firewall',
          component: firewallPage
        },
        {
          path: 'IPS',
          component: IPSPage
        },
        {
          path: 'pwdCracking',
          component: pwdCrackingPage
        }
      ]
    },
    { path: '/LogSearch', component: Index,
      children: [
        {
          path: 'firewall',
          component: firewallSearch
        },
        {
          path: 'IPS',
          component: IPSSearch
        }
      ]
    }
  ]
});