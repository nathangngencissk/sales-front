import axios from 'axios';

const baseURL = 'sales-server:3000';

export function _fetch(path, data = {}) {
    return axios
        .get(`${baseURL}/${path}`, data)
        .then(res => res.data)
        .catch(err => console.log(err));
}

export function _post(path, data) {
    return axios
        .post(`${baseURL}/${path}`, data)
        .then(res => res.data)
        .catch(err => console.log(err));
}

export function _put(path, data) {
    return axios
        .put(`${baseURL}/${path}`, data)
        .then(res => res.data)
        .catch(err => console.log(err));
}

export function _delete(path, data) {
    return axios
        .delete(`${baseURL}/${path}`, data)
        .then(res => res.data)
        .catch(err => console.log(err));
}

export function _fetchUsers() {
    return axios
        .get(`http://localhost:3333/api/user`)
        .then(res => res.data)
        .catch(err => console.log(err));

}

// export function fetchUsers() {
//     return _fetch('user/get-all'); // get, add, update, delete
// }

// export function login(userData) {
//     return _post('user/authenticate', userData)
// }

// export function fetchPosts(type) {
//     return _fetch(`${type}`);
// }

// export function fetchAdresses(id) {
//     return _fetch(`user/adresses?id=${id}`);
// }

// export function fetchRequests(id) {
//     return _fetch(`user/requests?id=${id}`);
// }

// export function addRequest(payload) {
//     return _post('user/start-request', payload);
// }

// export function fetchProducts() {
//     return _fetch('product/get-all');
// }

// export function fetchOrders(id) {
//     return _post('user/orders', { id: id });
// }

// export function addAddress(address) {
//     return _post('adress/add', address);
// }

// export function addUser(user) {
//     return _post('user/add', user);
// }

// export function buyProduct(payload) {
//     return _post('user/buy', payload);
// }