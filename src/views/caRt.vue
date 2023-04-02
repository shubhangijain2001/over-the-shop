<template>
  <div id="page-wrap">
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length>0">
    <div
      v-for="product in cartItems"
      :key="product.id"
      class="product-container"
    >
      <img class="product-image" :src="product.image" />
      <div class="details-wrap">
        <h3>{{ product.title }}</h3>
        <p>${{ product.price*product.quantity}}</p>
        <div class="div1">
            <button v-on:click="inc(product.id)" class="btn">+</button>
            <h4> {{      product.quantity }} </h4>
            <button v-on:click="dec(product.id)" class="btn">-</button>
        </div>
      </div>
      <button v-on:click="remove(product.id)" class="remove-button">Remove From Cart</button>
    </div>
    <h3 id="total-price">Total: ${{ totalPrice }}</h3>
    <button id="checkout-button">Proceed to Checkout</button>
  </div>
  <h1 class="hh" v-else>Cart is empty</h1>
  </div>

  
</template>

<script>
//import { cartItems } from '../fake-data';
import axios from "axios"
export default {
    name: 'CartPage',
    data() {
      return {
        cartItems:[],
        id:'',
      }
    },
    computed: {
      totalPrice() {
        /*return this.cartItems.reduce(
          (sum, item) => sum + Number(item.price),
          0,
        );*/
        let total=0
    this.cartItems.forEach(item => {
      total += item.price * item.quantity
    })
    return total
      }
      
    },
   async created(){
        let user=JSON.parse(localStorage.getItem('user-info')).id
        //console.log('bsacbb',user)
        let result=await axios.post(`http://localhost:5500/cart/${user}`)
        console.log(result.data)
        this.cartItems=result.data
        /*let id=JSON.stringify(result.data).fk_product_id
        console.log('product id',id)
        let res=await axios.get("http://localhost:5500/products/"+ id)
        console.log(res.data)*/
    },
    methods:{
        async remove(pid){
            let user=JSON.parse(localStorage.getItem('user-info')).id
            let result=await axios.post(`http://localhost:5500/delete/${user}/cart/${pid}`)
            console.log(result.data)
        },
        async dec(pid){
            let user=JSON.parse(localStorage.getItem('user-info')).id
            let result=await axios.post(`http://localhost:5500/dec/${user}/cart/${pid}`)
            console.log(result.data)
        },
        async inc(pid){
            let user=JSON.parse(localStorage.getItem('user-info')).id
            let result=await axios.post(`http://localhost:5500/inc/${user}/cart/${pid}`)
            console.log(result.data)
        },
    }
};
</script>

<style scoped>
  h1 {
    border-bottom: 1px solid black;
    margin: 0;
    margin-top: 16px;
    padding: 16px;
  }

  #total-price {
    padding: 16px;
    text-align: right;
  }

  #checkout-button {
    width: 100%;
  }

  .product-container {
    align-content: 'center';
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 16px;
    width: 100%;
  }

  .product-image {
    flex: 1;
    height: 100px;
    max-width: 100px;
  }

  .details-wrap {
    padding: 0 16px;
    flex: 3;
  }

  .remove-button {
    flex: 1;
    margin: auto;
  }
  .hh{
    margin-left: 300px;
    margin-right: 250px;
  }
  .div1{
    display: flex;
    flex-wrap: wrap;
  }
  .btn{
    height: 10px;
    width: 5px;
  }
  h4{
    margin-top: 10px;
  }
</style>
