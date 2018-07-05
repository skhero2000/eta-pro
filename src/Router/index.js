import Vue from 'vue';
import Router  from 'vue-router';
import Login from '~/pages/Login/Login.vue'
import Index from '~/pages/Index/Index.vue'
import Page1 from '~/pages/Test/Page1.vue'
import Page2 from '~/pages/TEST/Page2.vue'

import firewallPage from '~/pages/LogAnalyze/firewallPage.vue'
import IPSPage from '~/pages/LogAnalyze/IPS.vue'
import pwdCrackingPage from '~/pages/LogAnalyze/pwdCracking.vue'
import FramePage from '~/pages/Frame/Frame.vue'
import AlarmStatisticPage from '~/pages/LogAnalyze/AlarmStatistic.vue'

import firewallSearch from '~/pages/LogSearch/firewallPage.vue'
import IPSSearch from '~/pages/LogSearch/IPS.vue'
import pwdCrackingSearch from '~/pages/LogSearch/pwdCracking.vue'


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
        },
        {
          path: 'alarmStatistic',
          component: AlarmStatisticPage
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
        },
        {
          path: 'pwdCracking',
          component: pwdCrackingSearch
        }
      ]
    },
    { path: '/Frame', component: Index,
      children: [
        {
          path: 'Index/:url',
          component: FramePage
        }
      ]
    }
  ]
});