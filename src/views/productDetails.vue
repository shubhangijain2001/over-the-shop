<template>
  <div id="page-wrap">
    <div id="img-wrap">
      <img v-bind:src="product.image" />
    </div>
    <div id="product-details">
      <h1>{{ product.title }}</h1>
      <h3 id="price">${{ product.price }}</h3>
      <p>Average rating: {{ product.rate }}</p>
      <router-link v-bind:to="'/cart'" >
      <button v-on:click="cart(product.id)" id="add-to-cart">Add to Cart</button>
      </router-link>
      <h4>Description</h4>
      <p>{{ product.description }}</p>
    </div>
  </div>
</template>

<script>
//import { products } from '../fake-data';
import axios from "axios"
export default {
    name: 'ProductDetailPage',
    data() {
      return {
        products:[],
        product:[],
      };
    },
    methods:{
       async cart(idd){
            /*<router-link v-bind:to="'/cart'" >
      <button v-on:click="cart" id="add-to-cart">Add to Cart</button>
      </router-link>*/ 
      let user_id=parseInt(JSON.parse(localStorage.getItem('user-info')).id)
      console.log(idd)
      console.log(user_id)
      if(user_id)
      {
        this.$router.push({name:'Cart'})
        let result= await axios.post(`http://localhost:5500/add/${user_id}/cart/${idd}`)/*,{user_id:parseInt(this.user_id),product_id:idd,product_price:price,product_quantity:1})*/
        console.log("result",result.data)
      }
      else{
        this.$router.push({name:'login'})
      }
        }
    },
     async mounted(){
        let result=await axios.get("http://localhost:5500/products");
    this.products=(result.data)
    console.log(result.data)
    //console.log(this.products)
    //this.product=result.data[0].id
    for(let i=0;i<this.products.length;i++){
        //this.product=this.products.find((p) => p.id === this.$route.params.id)
        //console.log(this.products[i].id)
        if(this.products[i].id==this.$route.params.id)
        {
            this.product=this.products[i]
            break;
        }
    }
    
    console.log(this.product)
    }
    
};
</script>

<style scoped>
  #page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
  }

  #img-wrap {
    text-align: center;
  }

  img {
    width: 400px;
  }

  #product-details {
    padding: 16px;
    position: relative;
  }

  #add-to-cart {
    width: 100%;
  }

  #price {
    position: absolute;
    top: 110px;
    right: 16px;
  }
 /* #disp{
    display-outside:bl
  }*/
</style>
