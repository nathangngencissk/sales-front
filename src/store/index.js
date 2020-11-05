import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex)

export default new Vuex.Store({
    actions,
    mutations,

    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        customer: {},
        products: [],
        cartProducts: [],
        currentProduct: {},
        showModal: false,
        showPopupCart: false,
        categories: [],
        selectedCategories: []
    },

    getters: {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        getNotebooks: state => state.notebooks,
        getSmartphones: state => state.smartphones,
        getAllProducts: state => {
            if (state.selectedCategories.length > 0) {
                return state.products.filter(x => state.selectedCategories.includes(x.category))
            }

            return state.products
        },
        getProductsInCart: state => state.cartProducts,
        getCurrentProduct: state => state.currentProduct,
        getShowModal: state => state.showModal,
        getPopupCart: state => state.showPopupCart,
        getCategories: state => state.categories,
        getCustomer: state => state.customer,
        getToken: state => state.token
    }
})
