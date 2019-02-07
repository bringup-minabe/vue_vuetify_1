import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/customers',
      name: 'customers',
      component: () => import('./views/Customers.vue')
    },
    {
      path: '/memos',
      name: 'memos',
      component: () => import('./views/Memos.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue')
    },
  ]
})
