<template>
    <adMin/>
    <div id="div_rem"> 
    <div class="product-details-table">
    <table class="table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Description</th>
          <th>Category</th>
          <th>Ratings</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
        <td><img v-bind:src="product.image" /></td> 
          <td>{{ product.title }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.description }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.rate }}</td>
          <td>{{ product.count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>



<script>
//import navBar3 from "../components/navBar3.vue"
import adMin from "../components/adMin.vue"
import axios from "axios"
export default {
    name:'allProducts',
    components:{
        adMin,
       // navBar3
    },
    data(){
        return{
            products:[],
        }
    },
    async mounted(){
        if(JSON.parse(localStorage.getItem('user')).type=='user'){
            console.log(JSON.parse(localStorage.getItem('user')).type)
            this.$router.push({name:'Products'})
        }
        else if(JSON.parse(localStorage.getItem('user')).type=='admin'){
            this.$router.push({name:'allProducts'})
            let result=await axios.get("http://localhost:5500/products");
    this.products=result.data
        }
    },
    created(){
        if(JSON.parse(localStorage.getItem('user')).type=='admin'){
            this.$router.push({name:'allProducts'})
        }
    }
}
</script>

<style scoped> 
#div_rem {
  margin-left: 250px;
  margin-top: 10px;
}
.product-details-table {
  max-width: 800px;
  margin-left: 0px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.table th,
.table td {
  padding: 25px;
  text-align: left;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
}

.table th {
  font-weight: bold;
}

.table tbody tr:hover {
  background-color: #f8f8f8;
}
.table thead{
    background-image: linear-gradient(to right,#817f7e,#242323);
}
img{
    height:60px;
    width:60px;
    margin-top: 35px;
}
button{
    font-size: 14px;
    height: 50px;
    width:80px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>