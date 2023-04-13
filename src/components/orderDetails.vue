<template>
<div id="div-nav">
<h1>To continue with your order of value {{total}} please enter the following information</h1>
</div>
  <div id="div-ord">
    <form @submit.prevent="submitForm"> 
      <label for="fullName">Full Name:</label>
      <input id="fullName" type="text" v-model="fullName" placeholder="Full name" />
      <label for="">Address:</label>
      <input type="text" placeholder="House no." v-model="house_no">
      <input type="text" placeholder="Colony/Area" v-model="area">
      <input type="text" placeholder="Landmark" v-model="landmark">
      <input type="text" placeholder="City" v-model="city">
      <input type="text" placeholder="State" v-model="state">
      <input type="text" placeholder="Pincode" v-model="pincode">
      <!-- Add more address input fields here -->
      <label for="deliveryMode">Mode of Delivery:</label>
      <select id="deliveryMode" v-model="deliveryMode">
        <option value="COD">Cash on delivery</option>
        <option value="card">Card</option>
        <!-- Add more delivery mode options here -->
      </select><br><br>
      <button >Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios"

export default {
    name:'orderDetails',
  data() {
    return {
      fullName: '',
      house_no:'',
      area:'',
      landmark:'',
      city:'',
      state:'',
      pincode:'',
      deliveryMode: '',
      total:0,
      product_ids:[],
      cartItems:[],
      currentDate:''
    };
  },
  methods: {
    async submitForm() {
        let address=`${this.house_no} ${this.area} ${this.landmark} ${this.city} ${this.state} ${this.pincode}`
        //console.log(address)
        let user=JSON.parse(localStorage.getItem('user')).id
        //console.log('bsacbb',user)
       /* let result=await axios.post(`http://localhost:5500/cart/${user}`)
        console.log(result.data)
        this.cartItems=result.data
        console.log(this.cartItems)*/
        //this.cartItems.forEach(item=>this.product_ids.push(parseInt(item.id))
        //)
        //console.log('hii',this.product_ids)
        let res=await axios.post("http://localhost:5500/orders",{
            user_id:parseInt(user),
            ord_date:this.currentDate,
            add:address,
            mode:this.deliveryMode,
            total:this.total
        })
        console.log('after')
        console.log(res)

      if(this.deliveryMode=='card')
      {
        this.$router.push({name:'checkout'})
      }
      else if(this.deliveryMode=='COD'){
        this.$router.push({name:'order',params:{total:`${this.total}`}})
      }
    },
  },
  created(){
    if(JSON.parse(localStorage.getItem('user')).type=='user'){
            this.$router.push({name:'orderDetails'})
             this.total=this.$route.params.total
    console.log()
    // Get the current date using Moment.js
    this.currentDate = new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    });

        }
   
  },
   mounted(){
        if(JSON.parse(localStorage.getItem('user')).type=='user'){
            this.$router.push({name:'orderDetails'})

        }
        else{
            this.$router.push({name:'login'})
        }
    }
};
</script>

<style scoped>
#div-nav{
    background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  height:100px
}
#div-ord{
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
form {
 display: flex;
  flex-direction: column;
   /*Add margin or padding to create space between form elements */
  margin-bottom: 1rem; /* Example of margin */
  margin-left: 20px;
  font-size: 16px;

  
}
input {
  /* Add any additional styles for form inputs */
  margin-bottom: 1rem; /* Example of margin */
  width: 250px;font-size: 16px;
  
}
label{
    margin-right: 10px;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 1rem;
    
}
select{
    width:250px
}
option{
    width:250px
}
button{
    width:100px
}
</style>