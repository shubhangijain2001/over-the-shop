<template>
  <div class="login">
    <img class="logo" src="../assets/signuplogo.png" alt="Logo">
    <form @submit.prevent="login">
      <h1 class="head">Login</h1>
      <label for="username"><b>Contact Number</b></label>
      <input type="text" id="username" v-model="phone" placeholder="Contact Number">
      <label for="password"><b>Password</b></label>
      <input type="password" id="password" v-model="password" placeholder="Password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'loGin',
  data() {
    return {
      phone: '',
      password: '',
    };
  },
  methods: {
     async login() {
      // do something with the username and password
      console.log('Logging in with:', this.phone, this.password);
            let result= await axios.post(`http://localhost:5500/login`,{phone:this.phone,password:this.password});
            console.warn(result)
            console.log(result)
            if(result.status==201 && result.data.length>0)
            {
              localStorage.setItem("user",JSON.stringify(result.data[0]))
              if(result.data[0].type=='user'){
                this.$router.push({name:'Products'})
              }
              else if(result.data[0].type=='admin'){
                this.$router.push({name:'addProduct'})
              }
              
    }
    else if(result.data=='invalid password or phone number'){
        alert('invalid!!')
    }
  },
}
}
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

img {
  width:100px;
  height:100px;
  margin-bottom: 2rem;
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
}
.head{
    padding-bottom: 20px;
    /*margin-top: 10px;*/
}
</style>
