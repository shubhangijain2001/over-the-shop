<template>
<navBar1/>
  <div id="page-wrap">
    <div class="grid-wrap">
      <div
        v-for="product in products"
        class="product-item"
        v-bind:key="product.id"
      >
        <img v-bind:src="product.image" />
        <h3 class="product-name">{{ product.title }}</h3>
        <p class="product-price">${{ product.price }}</p>
        <router-link v-bind:to="'/products/' + product.id">
          <button>View Details</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
//import { products } from '../fake-data';
import navBar1 from "../components/navBar1.vue"
import axios from "axios"
export default {
    name: 'seaRch',
    components:{
      navBar1
    },
    data() {
      return {
       products:[],
       
      };
    },
    watch: {
    '$route.query.search': function(newValue, oldValue) {
      if (newValue !== oldValue) {
        console.log("hiiii")
        location.reload();
      }
    }
  },
    async mounted(){

        let key=this.$route.params.key
        console.log(key)
        let result=await axios.get(`http://localhost:5500/products/search/${key}`);
        console.log(result.data)
    this.products=result.data
    }
};
</script>

<style scoped>
  .grid-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 16px;
  }

  .product-item {
    align-items: center;
    border-radius: 8px;
    box-shadow: 0px 2px 5px #888;
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
    padding: 20px;
    position: relative;
    width: 32%;
  }

  .product-name {
    margin-bottom: 0;
  }

  img {
    height: 200px;
    width: 200px;
  }

  a {
    width: 100%;
  }

  button {
    width: 100%;
    margin:auto;
    /*margin-top: auto;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 0.25rem;*/
  }
</style>

