<template>
  <div class="signup">
    <img src="../assets/signuplogo.png" alt="Logo">
    <form @submit.prevent="signup">
      <h1 class="head">Sign Up</h1>
      <label for="username">Name:</label>
      <input type="text" id="username" v-model="name" placeholder="Name">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" placeholder="Email">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" placeholder="Password">
      <label for="confirmPassword">Address:</label>
      <input type="text" id="confirmPassword" v-model="address" placeholder="Address">
      <label for="pincode">Pincode:</label>
      <input type="text" id="username" v-model="pincode" placeholder="Pincode">
      <label for="phone">Contact Number:</label>
      <input type="text" id="username" v-model="phone" placeholder="Contact Number">
      <label for="">User Type:</label>
      <select v-model="type">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select><br>
      <button type="submit">Sign Up</button><br>
      <p>Already have an account?</p>
      <a href="/login" class="loghref">Login here</a>
    </form>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'signUp',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      address: '',
      pincode:'',
      phone:'',
      type:''
    };
  },
  methods: {
   async signup() {
      // do something with the username, email, password, and confirmPassword
      console.log('Signing up with:', this.name, this.email, this.password, this.address,this.pincode,this.phone,this.type);
    let result= await axios.post("http://localhost:5500/users",{
        name:this.name,
        email:this.email,
        password:this.password,
        address:this.address,
        pincode:parseInt(this.pincode),
        phone:parseInt(this.phone),
        type:this.type
     })
      console.log(result.data)
     if(result.data=='user already exist')
     {
        alert('user already exist!!')
        console.log('hello')
        this.name=''
        this.email=''
        this.password=''
        this.address=''
        this.pincode=''
        this.phone=''
        this.type=''
     }
     //console.log(result.data)
     let res= await axios.post(`http://localhost:5500/login`,{phone:parseInt(this.phone),password:this.password});
     if(result.status==201)
     {
        localStorage.setItem('user',JSON.stringify(res.data[0]));
        if(res.data[0].type=='user'){
          this.$router.push({name:'Products'})
        }
        else if(res.data[0].type=='admin'){
          this.$router.push({name:'addProduct'})
        }
    
    }
  },
}
}
</script>

<style scoped>
.signup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

img {
  width:100px;
  height:100px;
  margin-bottom: 2rem;
  margin-top: 170px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 2rem;
  border-radius: 0.25rem;
}

h2 {
  margin-bottom: 1rem;
}

label {
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}

button[type="submit"] {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  width: 100px
}
.head{
    padding-bottom: 20px;
    /*margin-top: 10px;*/
}
.loghref{
  color:blue
}
</style>
