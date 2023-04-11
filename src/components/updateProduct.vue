<template>
  <adMin/>
  <div id="div_pro">
    <h2>Update Product</h2>
    <br>
    <form action="">
    <label for="">Product Title</label>
    <input type="text" v-model="title"><br>
    <label for="">Product Price</label>
    <input type="text" v-model="price"><br>
    <div class="txtarea">
        <label for="">Description</label>
    <textarea name="" id="" cols="30" rows="10" v-model="description"></textarea>
    </div>
    <br>
    <label for="">Category</label>
    <input type="text" v-model="category"><br>
    <label for="">Image URL</label>
    <input type="text" v-model="imageURL"><br>
    <label for="">Rating</label>
    <input type="text" v-model="rating"><br>
    <label for="">Quantity Avaible</label>
    <input type="text" v-model="count"><br>
    <button class="btnAdd" v-on:click="update_product">Update product</button>
    </form>
  </div>
</template>


<script>
import adMin from './adMin.vue'
//import navBar3 from './navBar3.vue'
import axios from "axios"
export default {
    name:'addProduct',
    data(){
        return{
            title:'',
            price:'',
            description:'',
            imageURL:'',
            rating:'',
            count:'',
            category:'',
            productData:[],
            idd:0
        }
    },
    components:{
        adMin,
       // navBar3
    },
    methods:{
        async update_product(){
           let result=await axios.post('http://localhost:5500/updateproduct',{
                idd:this.idd,
                title:this.title,
                price:parseInt(this.price),
                description:this.description,
                category:this.category,
                image:this.imageURL,
                rate:parseInt(this.rating),
                count:parseInt(this.count)
            })
            console.log(result.data)
        }
    },
    mounted(){
        if(JSON.parse(localStorage.getItem('user')).type=='user'){
            console.log(JSON.parse(localStorage.getItem('user')).type)
            this.$router.push({name:'Products'})
        }
        else if(JSON.parse(localStorage.getItem('user')).type=='admin'){
            this.$router.push({name:'updateProduct'})
        }
    },
    async created(){
        if(JSON.parse(localStorage.getItem('user')).type=='admin'){
            this.$router.push({name:'updateProduct'})
            this.idd=this.$route.params.id
        console.log('hii',this.idd)
        let idd=this.idd
        let result=await axios.get(`http://localhost:5500/getproducts/${idd}`);
        console.log(result.data)
    this.productData=(result.data[0])
    this.title = this.productData.title;
  this.price = this.productData.price;
  this.description = this.productData.description;
  this.imageURL = this.productData.image;
  this.rating = this.productData.rate;
  this.count = this.productData.count;
  this.category = this.productData.category;
        }
         
    }
}
</script>

<style scoped>
#div_pro {
  margin-left: 250px;
  margin-top: 10px;
   background-image: url('../assets/bg_add3.jpg'); /* Replace with your image file path */
  background-size: cover; /* Set the background image size to cover */
  background-position: center center;
  /*display: flex;
  justify-content: center;
  align-items: center;
   Set height and width of container as needed 
  height: 100vh;
  width: 100%;*/
}
form {
 /* display: flex;
  flex-direction: column;
   Add margin or padding to create space between form elements */
  margin-bottom: 1rem; /* Example of margin */
  margin-left: 20px;
  
}
input {
  /* Add any additional styles for form inputs */
  margin-bottom: 1rem; /* Example of margin */
  
}
label{
    margin-right: 10px;
    font-weight: bold;
    
}
.txtarea{
    display: flex;
  /*flex-direction: column;*/
  align-items: center
}
.btnAdd{
    margin-left: 75px;
}
</style>
