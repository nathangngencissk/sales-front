import axios from 'axios';

const baseURL = 'http://localhost:3000/api';

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

export function fetchCategories() {
    return _fetch('category/get_all');
}

export function fetchProducts() {
    return _fetch('product/get_products');
}