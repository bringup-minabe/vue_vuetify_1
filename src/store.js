import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paginate_limit: 10,
        url_query: {}
    },
    mutations: {
        setUrlQuery(state, payload) {
            this.state.url_query = Vue.util.extend({}, payload);
        },
        resetUrlQuery() {
            this.state.url_query = {};
        }
    },
    actions: {

    }
})
