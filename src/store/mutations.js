export function INITIALISE_STORE(state) {
    const customer = localStorage.getItem('customer')
    if (customer) {
        state.customer = JSON.parse(customer);
    }
}

export function SET_USERS(state, users) {
    state.users = users;
}

export function SET_PRODUCTS(state, products) {
    let allProducts = products.campaignProducts.concat(products.recommendedProducts).concat(products.otherProducts)
    state.products = allProducts;
}

export function SET_CATEGORIES(state, categories) {
    state.categories = categories;
}

export function AUTH_REQUEST(state) {
    state.status = 'loading'
}

export function AUTH_SUCCESS(state, { token, customer }) {
    state.status = 'success'
    state.token = token
    state.customer = customer
}

export function AUTH_ERROR(state) {
    state.status = 'error'
}

export function LOGOUT(state) {
    state.status = ''
    state.token = ''
}

export function ADD_PRODUCT(state, updatedProduct) {
    for (let product of state.products) {
        if (product._id == updatedProduct._id) {
            let index = state.products.indexOf(product)
            state.products[index].quantity = updatedProduct.quantity
            state.cartProducts.push(product);
        }
    }
}

export function REMOVE_PRODUCT(state, { index, updatedProduct }) {
    state.cartProducts.splice(index, 1);

    for (let product of state.products) {
        if (product._id == updatedProduct._id) {
            let index = state.products.indexOf(product)
            state.products[index].quantity = updatedProduct.quantity
        }
    }
}

export function UPDATE_PRODUCT(state, updatedProduct) {
    for (product of state.products) {
        if (product._id == updatedProduct._id) {
            product = updatedProduct
        }
    }
}

export function CURRENT_PRODUCT(state, product) {
    state.currentProduct = product;
}

export function SHOW_MODAL(state) {
    state.showModal = !state.showModal;
}

export function SHOW_POPUP_CART(state) {
    state.showPopupCart = !state.showPopupCart;
}

export function TOGGLE_CATEGORY(state, category) {
    if (state.selectedCategories.includes(category._id)) {
        state.selectedCategories = state.selectedCategories.filter(x => x != category._id)
    }
    else {
        state.selectedCategories.push(category._id);
    }
}

export function BUY_SUCCESS(state) {
    state.cartProducts = []
}

export function BUY_ERROR(state) {
    state.cartProducts = []
}
