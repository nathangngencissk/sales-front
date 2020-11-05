import { fetchCategories, fetchProducts } from './fetch';
import axios from 'axios'
import product from '../../../sales-module/src/controllers/product';

export function FETCH_CATEGORIES({ commit, dispatch }) {
    return fetchCategories()
        .then(categories => {
            return commit('SET_CATEGORIES', categories)
        });
}

export function FETCH_PRODUCTS({ commit, dispatch }) {
    return fetchProducts()
        .then(products => {
            return commit('SET_PRODUCTS', products)
        });
}

export function CONFIRM({ commit, dispatch, getters }, products) {
    return new Promise((resolve, reject) => {
        let payload = {
            products: products,
            customer: getters.getCustomer
        }
        axios({ url: 'http://localhost:3000/api/order/buy', data: payload, method: 'POST' })
            .then(resp => {
                if (resp.data.msg == "success") {
                    axios({ url: 'http://localhost:3000/api/customer/get', data: getters.getCustomer, method: 'POST' })
                        .then(respSales => {
                            const customer = respSales.data
                            const token = getters.getToken
                            localStorage.setItem('customer', JSON.stringify(customer))
                            commit('AUTH_SUCCESS', { token, customer })
                            commit('BUY_SUCCESS')
                            resolve(resp)
                        })

                }
            })
            .catch(err => {
                commit('BUY_ERROR')
                reject(err)
            })
    })
}

export function LOGIN({ commit, dispatch }, user) {
    return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({ url: 'http://localhost:3333/api/auth/authenticate', data: user, method: 'POST' })
            .then(resp => {
                axios({ url: 'http://localhost:3000/api/customer/get', data: resp.data.user, method: 'POST' })
                    .then(respSales => {
                        const token = resp.data.token
                        const customer = respSales.data
                        localStorage.setItem('token', token)
                        localStorage.setItem('customer', JSON.stringify(customer))
                        axios.defaults.headers.common['Authorization'] = token
                        commit('AUTH_SUCCESS', { token, customer })
                        resolve(resp)
                    })
            })
            .catch(err => {
                commit('AUTH_ERROR')
                localStorage.removeItem('token')
                reject(err)
            })
    })
}

export function LOGOUT({ commit }) {
    return new Promise((resolve, reject) => {
        commit('LOGOUT')
        localStorage.removeItem('token')
        localStorage.removeItem('customer')
        delete axios.defaults.headers.common['Authorization']
        resolve()
    })
}

export function addProduct(context, product) {
    axios({ url: 'http://localhost:3000/api/product/add_to_cart', data: product, method: 'POST' })
        .then(resp => {
            return context.commit('ADD_PRODUCT', resp.data.product);
        })

}

export async function removeProduct(context, index) {
    let resp = await axios({ url: 'http://localhost:3000/api/product/remove_from_cart', data: context.getters.getProductsInCart[index], method: 'POST' })

    let updatedProduct = resp.data.product;

    return context.commit('REMOVE_PRODUCT', { index, updatedProduct });
}

export async function removeAllProducts(context) {
    for (let product of context.getters.getProductsInCart) {
        let resp = await axios({ url: 'http://localhost:3000/api/product/remove_from_cart', data: product, method: 'POST' })
    }
}

export function currentProduct(context, product) {
    return context.commit('CURRENT_PRODUCT', product);
}

export function showOrHiddenModal(context) {
    return context.commit('SHOW_MODAL');
}

export function showOrHiddenPopupCart(context) {
    return context.commit('SHOW_POPUP_CART');
}

export function toggleCategory(context, category) {
    return context.commit('TOGGLE_CATEGORY', category);
}