<template>
<navBar1/>
  <div id="page-wrap">
    <h1>My Wishlist</h1>
    <div v-if="cartItems.length>0">
    <div
      v-for="product in cartItems"
      :key="product.id"
      class="product-container"
    >
      <img class="product-image" :src="product.image" />
      <div class="details-wrap">
        <h3>{{ product.title }}</h3>
        <p>${{ product.price}}</p>
      </div>
      <button v-on:click="remove(product.id)" class="remove-button">Remove From Wishlist</button>
      <button v-on:click="add(product.id)" class="remove-button">Add to cart</button>
    </div>
  </div>
     <div class="wimg"  v-else>
    <img src="../assets/empty_wishlist.png" alt="">
  </div>
  </div>
  

  
</template>

<script>
import axios from "axios"
import navBar1 from './navBar1.vue';
export default {
    name: 'wishList',
    components:{
        navBar1
    },
    data() {
      return {
        cartItems:[],
        id:'',
      }
    },
   async created(){
        let user=JSON.parse(localStorage.getItem('user-info')).id
        //console.log('bsacbb',user)
        let result=await axios.post(`http://localhost:5500/wishlist/${user}`)
        console.log(result.data)
        this.cartItems=result.data
        /*let id=JSON.stringify(result.data).fk_product_id
        console.log('product id',id)
        let res=await axios.get("http://localhost:5500/products/"+ id)
        console.log(res.data)*/
    },
    methods:{
        async remove(pid){
            let user=JSON.parse(localStorage.getItem('user')).id
            console.log(user,pid)
            let result=await axios.post(`http://localhost:5500/delete/${user}/wishlist/${pid}`)
            console.log(result.data)
        },
        async add(pid){
        let user=JSON.parse(localStorage.getItem('user')).id
        //console.log('bsacbb',user)
        let result= await axios.post(`http://localhost:5500/add/${user}/cart/${pid}`)
        console.log(result.data)
         let res=await axios.post(`http://localhost:5500/delete/${user}/wishlist/${pid}`)
        console.log(res.data)
        this.$router.push({name:'Cart'})
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
    margin-left: 250px;
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
  .wimg{
    display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  }
</style>
