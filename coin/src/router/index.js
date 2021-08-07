import Vue from 'vue'
import VueRouter from 'vue-router'

import pledgeFarm from '@/components/pledge-bscfarm.vue'
import page1 from '@/components/page1.vue'
import page2 from '@/components/page2.vue'
import rule from '@/components/rule.vue'
import team from '@/components/team.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: pledgeFarm,
      meta: {
        title: 'AI Farmer'
      }
    },{
      path: '/tta/farm',
      component: pledgeFarm,
      meta: {
        title: 'AI Farmer'
      }
    }
    ,{
      path: '/tta/page1',
      component: page1,
      meta: {
        title: ''
      }
    }
    ,{
      path: '/tta/rule',
      component: rule,
      meta: {
        title: 'Rule'
      }
    }
    ,{
      path: '/tta/team',
      component: team,
      meta: {
        title: 'team'
      }
    }
    ,{
      path: '/tta/page2',
      component: page2,
      meta: {
        title: ''
      }
    }
  ]
})
export default router