import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import About from './views/About.vue'
import CustomersRoot from './views/Customers/root.vue'
import CustomersIndex from './views/Customers/index.vue'
import CustomersView from './views/Customers/view.vue'
import CustomersEdit from './views/Customers/edit.vue'
import MemosIndex from './views/Memos/index.vue'
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
            component: CustomersRoot,
            children: [
                {
                    path: '',
                    component: CustomersIndex
                },
                {
                    path: ':id',
                    component: CustomersView
                },
                {
                    path: ':id/edit',
                    component: CustomersEdit
                }
            ]
        },
        {
            path: '/memos',
            name: 'memos',
            component: MemosIndex
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings
        },
    ]
})
