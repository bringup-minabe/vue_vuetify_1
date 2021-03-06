import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'babel-polyfill'
import 'vuetify/dist/vuetify.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, fab, far)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuetify);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false

Vue.prototype.$eventHub = new Vue();

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
