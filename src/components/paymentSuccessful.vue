<template>
    <div id="div-ordd">
        <div id="div-nav">
            <h2>Thank You!</h2><br>
        <h3>Your order has been placed</h3>
        </div>
        
        <p>Your order id: {{items.order_id}}</p><br><hr>
        <h4>Order details</h4>
        <div class="product-details-table">
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.title }}</td>
          <td>{{ product.quantity }}</td>
        </tr>
      </tbody>
    </table>
  </div>
        <p><b>Order date:</b>{{ items.ord_date}}</p>
        <p><b> Order value:</b>{{ total}}</p><br>
        <h4>Address details</h4><br>
        <p>{{items.address}}</p>
        <div>
            <button v-on:click="continue1">Continue shopping</button><br>
        <button v-on:click="logout">Logout</button>
        </div>
        
</div>
</template>

<script>
import axios from "axios"
export default {
    name:'paymentSuccessful',
    data(){
        return{
            items:[],
            products:[],
            total:0
        }
    },
    methods:{
        continue1(){
            this.$router.push({name:'Products'})
        },
        logout(){
            localStorage.clear()
            this.$router.push({name:'login'})
        }
    },
    async created(){
        this.total=this.$route.params.total
        if(JSON.parse(localStorage.getItem('user')).type=='user'){
            this.$router.push({name:'order'})
        let user=JSON.parse(localStorage.getItem('user')).id
        let id=parseInt(user)
        let result=await axios.get(`http://localhost:5500/getorders/${id}`)
        this.items=result.data[0]
        console.log('result1',result.data)
        let res=await axios.post(`http://localhost:5500/cart/${user}`)
        console.log('result2',res.data)
        this.products=res.data
        console.log("cart data",this.products)
       for(let i=0;i<res.data.length;i++){
            //console.log('hii')
            let res1=await axios.post("http://localhost:5500/history",{
                user_id:parseInt(user),
                product_id:parseInt(this.products[i].id),
                quantity:this.products[i].quantity

            })
            console.log("result3",res1.data)

            let res2=await axios.post("http://localhost:5500/updateQuantity",{
                quan:this.products[i].quantity,
                product_id:parseInt(this.products[i].id),
            })
            console.log(res2.data)
            
        }
        const order_items=[]
        for(let i=0;i<this.products.length;i++){
            order_items.push({product_name: this.products[i].title, 
            quantity: this.products[i].quantity, 
            price: this.products[i].price})
        }
        let res1=await axios.post(`http://localhost:5500/emptyCart/${id}`)
        console.log(res1)
        let user_info=JSON.parse(localStorage.getItem('user'))
        let res3=await axios.post('http://localhost:5500/api/send-order-email',{
            name:user_info.name,
            email:user_info.email,
            order_id:this.items.order_id,
            total:this.total,
            order_date:this.items.ord_date,
            order_items
        })
        console.log("email",res3.data)

        }
        else{
            this.$router.push({name:'login'})
        }
    },
    mounted(){
        if(JSON.parse(localStorage.getItem('user')).type=='user'){
            this.$router.push({name:'order'})

        }
        else{
            this.$router.push({name:'login'})
        }
    }

}
</script>

<style scoped>
#div-nav{
    background-color: #333;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin-top: 0px;
  width:100%
}
#div-ordd{
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
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
.product-details-table {
  max-width: 800px;
  margin-left: 0px;
}
button{
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #130101;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>