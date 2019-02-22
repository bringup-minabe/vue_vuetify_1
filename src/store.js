import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paginate_limit: 10
    },
    mutations: {
    //     setUrlQuery(state, payload) {
    //         this.state.url_query = Vue.util.extend({}, payload);
    //     },
    },
    actions: {

    }
})
