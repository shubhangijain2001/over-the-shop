<template>
<navBar1/>
  <div id="page-wrap">
    <div id="img-wrap">
      <img v-bind:src="product.image" />
    </div>
    <div id="product-details">
      <div id="div1">
      <h1>{{ product.title }}</h1>
      <button class="my-btn" v-on:click="wishlist(product.id)">❤</button>
      </div>
      <h3 id="price">${{ product.price }}</h3>
      <p>Average rating: {{ product.rate }}</p>
      <div v-if="product.count>0">
      <button v-on:click="cart(product.id)" id="add-to-cart">Add to Cart</button>
      </div>
      <div v-else>
        <h2 class="out">Out of stock</h2>
      </div>
      <h4>Description</h4>
      <p>{{ product.description }}</p>
    </div>
  </div>
</template>

<script>
//import { products } from '../fake-data';
import axios from "axios"
import navBar1 from "../components/navBar1.vue"
export default {
    name: 'ProductDetailPage',
    components:{
      navBar1
    },
    data() {
      return {
        products:[],
        product:[],
      };
    },
    methods:{
       async cart(idd){
        let user=JSON.parse(localStorage.getItem('user'))
        //let user_id=user.id
        console.log(user)
      let user1= user? parseInt(user.id): null
      console.log(user1)
      
      //console.log(idd)
      //console.log("hiiii",user_id)
      

    if(!user1){
        this.$router.push({name:'login'})
      }  
    else
      { 
        this.$router.push({name:'Cart'})
        let user_id=JSON.parse(localStorage.getItem('user')).id
        let result= await axios.post(`http://localhost:5500/add/${user_id}/cart/${idd}`)/*,{user_id:parseInt(this.user_id),product_id:idd,product_price:price,product_quantity:1})*/
        console.log("result",result.data)
      }
      
        },
    async wishlist(idd){
      let user_id=parseInt(JSON.parse(localStorage.getItem('user')).id)
      if(user_id)
      {
        this.$router.push({name:'wishlist'})
        let result= await axios.post(`http://localhost:5500/add/${user_id}/wishlist/${idd}`)
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
  .my-btn {
    height: 20px;
    /* width: 15px; */
    justify-content: center;
    align-items: center;
    display: flex;
    margin-top: 40px;
  background-color: red;
  color: white
}

.my-btn:active {
  background-color: red;
}
#div1{
  display: flex;
}
.out{
  color:red;
}
</style>
