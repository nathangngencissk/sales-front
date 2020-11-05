import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from "../store";
import AllProducts from '../components/AllProducts';
import AllSmartphones from '../components/AllSmartphones';
import AllNotebooks from '../components/AllNotebooks';
import Product from '../components/Product';
import CartCheckout from '../components/CartCheckout';

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: AllProducts,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/account',
        name: 'Account',
        component: () => import('../views/Account.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/smartphones',
        name: 'Smartphones',
        component: AllSmartphones,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/notebooks',
        name: 'Notebooks',
        component: AllNotebooks,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/product-details',
        name: 'Product',
        component: Product,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: CartCheckout,
        meta: {
            requiresAuth: true
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
            next()
            return
        }
        next('/login')
    } else {
        next()
    }
})

export default router
