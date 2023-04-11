<template>
<navBar3 />
<div id="div-head">
    
  <div id="div1" class="icon-div">
    <font-awesome-icon :icon="faCamera" class="icon" style="color: #f7f7f7;"/>
   <p>
    Products<br>
    {{products}}</p> 
  </div>
  <div id="div2" class="icon-div">
    <font-awesome-icon :icon="faUsers" class="icon" style="color: #f7f7f7;"/>
   <p>
    Users<br>
    {{users}}</p> 
  </div>
  <div id="div3" class="icon-div">
    <font-awesome-icon :icon="faCartShopping" class="icon" style="color: #f7f7f7;"/>
   <p>
    Orders<br>
    {{orders}}</p> 
  </div>
  <div id="div4" class="icon-div">
    <font-awesome-icon :icon="faWallet" class="icon" style="color: #f7f7f7;"/>
   <p>
   Total Sales<br>
    ${{totalPrice}}</p> 
  </div>
</div>
  
</template>

<script>
import navBar3 from './navBar3.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import axios from "axios"
export default {
  name: 'adMin',
  components: {
    navBar3,
    FontAwesomeIcon,
    
  },
  data() {
    return {
      faCamera, // Add the faShoppingCart icon to the data property
      faUsers,
      faCartShopping,
      faWallet,
      products:0,
      users:0,
      orders:0,
      items:[]
    };
    
  },
  computed: {
      totalPrice() {
        /*return this.cartItems.reduce(
          (sum, item) => sum + Number(item.price),
          0,
        );*/
        let total=0
    this.items.forEach(item => {
      total += item.total
    })
    return total
      }
      
    },
  async mounted(){
    let product_count=await axios.get("http://localhost:5500/countproducts")
    this.products=product_count.data[0].count
    let users_count=await axios.get("http://localhost:5500/countusers")
    this.users=users_count.data[0].count
    let users_orders=await axios.get("http://localhost:5500/countorders")
    this.orders=users_orders.data[0].count
    console.log(users_orders)
    let result=await axios.get(`http://localhost:5500/sales`)
    this.items=result.data
        console.log(result.data)
  }
};
</script>

<style scoped>
#div1 {
    
  justify-content: flex-start;
  display: flex;
  height: 70px;
  width: 220px;
  align-items: center;
  margin-block: 10px;
  background-image: linear-gradient(to right, #02607c, #9ddaf7);
  color:white;
  margin-left: 20px;
  /* Define your gradient color here */
}
#div2 {
    
  justify-content: flex-start;
  display: flex;
  height: 70px;
  width: 220px;
  align-items: center;
  margin-block: 10px;
  background-image: linear-gradient(to right, #f50656, #ecbed1);
  color:white
  /* Define your gradient color here */
}
#div3 {
    
  justify-content: flex-start;
  display: flex;
  height: 70px;
  width: 220px;
  align-items: center;
  margin-block: 10px;
  background-image: linear-gradient(to right, #f58506, #f3d2b7);
  color:white
  /* Define your gradient color here */
}
#div4 {
    
  justify-content: flex-start;
  display: flex;
  height: 70px;
  width: 220px;
  align-items: center;
  margin-block: 10px;
  background-image: linear-gradient(to right, #048630, #9cd38e);
  color:white
  /* Define your gradient color here */
}
.icon {
  font-size: 24px; /* Set the font size for the icon */
  margin-right: 35px; /* Add margin to the right of the icon */
  margin-left: 10px;
}
#div-head{
    display:flex;
    margin-left: 230px;
}
.icon-div {
  margin-left: 40px; /* Add margin between the icon-div elements */
}
.icon-div + .icon-div {
  margin-right: 5px; /* Adjust the margin as per your requirement */
}
/*p{
    font-style:;
}*/
</style>
