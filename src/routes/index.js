import { createRouter, createWebHistory } from 'vue-router'
import proDucts from "../views/proDucts.vue"
import productDetails from "../views/productDetails.vue"
import caRt from "../views/caRt.vue"
import loGin from "../components/loGin.vue"
import signUp from "../components/signUp.vue"
import elecTronics from "../components/elecTronics.vue"
import womenClothing from "../components/womenClothing.vue"
import menClothing from "../components/menClothing.vue"
import jeweLlery from "../components/jeweLlery.vue"
import seaRch from "../components/seaRch.vue"
import wishList from "../components/wishList.vue"
import checkOut from "../components/checkOut.vue"
import addProduct from "../components/addProduct.vue"
import removeProduct from "../components/removeProduct.vue"
import updateProduct from "../components/updateProduct.vue"
import allUsers from "../components/allUsers.vue"
import allProducts from "../components/allProducts.vue"
import orderDetails from "../components/orderDetails.vue"
import paymentSuccessful from "../components/paymentSuccessful.vue"
import orderHistory from "../components/orderHistory.vue"
import allOrders from "../components/allOrders.vue"

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
        name : 'signup',
        component: signUp
    },
    {
        path: '/electronics',
        name : 'electronics',
        component: elecTronics
    },
    {
        path: '/jewellery',
        name : 'jewellery',
        component: jeweLlery
    },
    {
        path: '/menClothing',
        name : 'menClothing',
        component: menClothing
    },
    {
        path: '/womenClothing',
        name : 'womenClothing',
        component: womenClothing
    },
    {
        path: '/search/:key',
        name : 'search',
        component: seaRch
    },
    {
        path: '/wishlist',
        name : 'wishlist',
        component: wishList
    },
    {
        path: '/checkout',
        name : 'checkout',
        component:checkOut
    },
    {
        path: '/addProduct',
        name : 'addProduct',
        component:addProduct
    },
    {
        path: '/removeProduct',
        name : 'remove',
        component:removeProduct
    },
    {
        path: '/updateProduct/:id',
        name : 'updateProduct',
        component:updateProduct
    },
    {
        path: '/allUsers',
        name : 'allUsers',
        component:allUsers
    },
    {
        path: '/allProducts',
        name : 'allProducts',
        component:allProducts
    },
    {
        path: '/orderDetails/:total',
        name : 'orderDetails',
        component:orderDetails
    },
    {
        path: '/order',
        name : 'order',
        component:paymentSuccessful
    },
    {
        path: '/orderHistory',
        name : 'orderHistory',
        component:orderHistory
    },
    {
        path: '/allOrders',
        name : 'allOrders',
        component:allOrders
    },
]

const router = createRouter({ 
    history: createWebHistory(),
    routes 
})
export default router