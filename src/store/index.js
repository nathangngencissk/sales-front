import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    mutations,

    state: {
        cartProducts: [],
        users: [],
        status: '',
        token: localStorage.getItem('token') || '',
        user: {}
    },

    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    }
})
