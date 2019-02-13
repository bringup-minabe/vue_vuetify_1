import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import About from './views/About.vue'
import Customers from './views/Customers.vue'
import Memos from './views/Memos.vue'
import Settings from './views/Settings.vue'

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
      component: About
    },
    {
      path: '/customers',
      name: 'customers',
      component: Customers
    },
    {
      path: '/memos',
      name: 'memos',
      component: Memos
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
  ]
})
