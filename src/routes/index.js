import { createRouter, createWebHistory } from 'vue-router'
import proDucts from "../views/proDucts.vue"
import productDetails from "../views/productDetails.vue"
import caRt from "../views/caRt.vue"
import loGin from "../components/loGin.vue"
import signUp from "../components/signUp.vue"

const routes = [
    {
        path: '/products',
        name: 'Products',
        component: proDucts
    },
    {
        path: '/products/:id',
        name: 'productDetails',
        component: productDetails
    },
    {
        path: '/cart',
        name: 'Cart',
        component: caRt
    },
    {
        path: '/login',
        name : 'login',
        component: loGin
    },
    {
        path: '/signup',
        name : 'signuo',
        component: signUp
    }
]

const router = createRouter({ 
    history: createWebHistory(),
    routes 
})
export default router