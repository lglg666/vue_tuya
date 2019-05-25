import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import share from '@/components/share'
import Doodling from '@/components/Doodling'
import ce from '@/components/ce'
import history from '@/components/History'
import Customized from '@/components/Customized'
import dingzhi from '@/components/dingzhi'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/share',
      name: 'share',
      component: share
    },
    {
      path: '/Doodling',
      name: 'Doodling',
      component: Doodling
    },
    {
      path: '/ce',
      name: 'ce',
      component: ce
    },
    {
      path: '/history',
      name: 'history',
      component: history
    },
    {
      path: '/Customized',
      name: 'Customized',
      component: Customized
    },
    {
      path: '/dingzhi',
      name: 'dingzhi',
      component: dingzhi
    }
  ]
})
