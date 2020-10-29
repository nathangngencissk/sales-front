import { _fetchUsers } from './fetch';
import axios from 'axios'

export function GET_USERS({ commit, dispatch }) {
    return _fetchUsers()
        .then(users => {
            return commit('SET_USERS', users)
        });
}

export function LOGIN({ commit }, user) {
    return new Promise((resolve, reject) => {
        commit('AUTH_REQUEST')
        axios({ url: 'http://localhost:3333/api/auth/authenticate', data: user, method: 'POST' })
            .then(resp => {
                const token = resp.data.token
                const user = resp.data.user
                localStorage.setItem('token', token)
                axios.defaults.headers.common['Authorization'] = token
                commit('AUTH_SUCCESS', token, user)
                resolve(resp)
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
        delete axios.defaults.headers.common['Authorization']
        resolve()
    })
}