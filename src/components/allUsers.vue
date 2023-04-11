<template>
    <adMin/>
    <div id="div_rem"> 
    <div class="product-details-table">
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Password</th>
          <th>Address</th>
          <th>Pincode</th>
          <th>Email</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.phone }}</td>
          <td>{{ product.password }}</td>
          <td>{{ product.address }}</td>
          <td>{{ product.pincode }}</td>
          <td>{{ product.email }}</td>
          <td><button v-on:click="removeUser(product.id)">Remove user</button></td>
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
    name:'allUsers',
    components:{
        adMin,
       // navBar3
    },
    data(){
        return{
            products:[],
        }
    },
    methods:{
     async removeUser(uid){
        let result=await axios.post(`http://localhost:5500/removeUser/${uid}`)
        console.log(result.data)
        let res=await axios.get("http://localhost:5500/users");
    this.products=res.data
     }
    },
    async mounted(){
         
        if(JSON.parse(localStorage.getItem('user')).type=='user'){
            console.log(JSON.parse(localStorage.getItem('user')).type)
            this.$router.push({name:'Products'})
        }
        else if(JSON.parse(localStorage.getItem('user')).type=='admin'){
            this.$router.push({name:'allUsers'})
            let result=await axios.get("http://localhost:5500/users");
            this.products=result.data
        }
    },
    created(){
        if(JSON.parse(localStorage.getItem('user')).type=='admin'){
            this.$router.push({name:'allUsers'})
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