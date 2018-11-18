import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: () => import('views/recommend/recommend')
    },
    {
      path: '/singer',
      component: () => import('views/singer/singer')
    },
    {
      path: '/rank',
      component: () => import('views/rank/rank')
    },
    {
      path: '/search',
      component: () => import('views/search/search')
    }
  ]
})
