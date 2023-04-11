<template>
<navBar1/>
<div>
<div v-if="products.length>0" class="product-details-table">
    <table class="table">
      <tbody>
        <tr v-for="product in products" :key="product.fk_user_id">
        <td><img v-bind:src="product.image" /></td> 
          <p>{{ product.title }}</p><br>
          <p>Price:{{ product.price }}</p>
          <p>Order date:{{ product.ord_date }}</p>
          <p>Quantity:{{ product.quantity }}</p>
          <p>Order id:{{ product.order_id }}</p>
          <p>User id:{{ product.fk_user_id }}</p>
          <p><b>Total:{{ product.total }}</b></p>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else class="wimg">
    <img class="imgno" src="../assets/no_order.png" alt="">
  </div>
</div>
</template>

<script>
import axios from "axios"
import navBar1 from './navBar1.vue';
export default {
    name:'orderHistory',
    components:{
        navBar1
    },
    data(){
        return{
            products:[]
        }
    },
    async created(){
        if(JSON.parse(localStorage.getItem('user')).type=='user'){
            this.$router.push({name:'orderHistory'})
            let user=JSON.parse(localStorage.getItem('user')).id
        let result=await axios.post(`http://localhost:5500/gethistory/${user}`)
        console.log(result.data)
        this.products=result.data
        }
    },
     mounted(){
        if(JSON.parse(localStorage.getItem('user')).type=='user'){
            this.$router.push({name:'orderHistory'})

        }
        else{
            this.$router.push({name:'login'})
        }
    }
}
</script>

<style scoped>
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
    height:80px;
    width:80px;
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
.wimg{
    display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  }
.imgno{
    height:300px;
    width:300px
}
</style>