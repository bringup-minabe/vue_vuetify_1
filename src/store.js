import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        paginate_limit: 10,
        flash: {
            type: '',
            msg: ''
        }
    },
    mutations: {
        setFlash(state, payload) {
            let type = 'success';
            let msg = '';
            if (payload.type != undefined) {
                type = payload.type;
            }
            if (payload.msg != undefined) {
                msg = payload.msg;
            }
            state.flash.type = type
            state.flash.msg = msg
        },
        destroyFlash(state) {
            state.flash.type = ''
            state.flash.msg = ''
        },
    },
    actions: {

    }
})
