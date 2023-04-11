<template>
  <nav>
    <button v-on:click="show">OVER THE SHOP</button>
    <div v-if="showSidebar" ref="sidebar">
  <sideBar @clicked="onClickChild($event)"/>
</div>
    
    <div class="nav-left">
      <ul>
        <li><router-link to="/products">Home</router-link></li>
        <li><router-link to="/orderHistory">Order history</router-link></li>
        <li><a v-on:click="logout " href="/signup">Logout</a></li>
      </ul>
    </div>
  </nav>
  <div >
    </div>
</template>

<script>
import sideBar from "./sideBar.vue"
//import router from "../routes/index"
export default {
  name: 'navBar2',
  components:{
    sideBar,
  },
  data() {
    return {
      searchTerm: '',
      showSidebar: false,

  };
  },
  methods: {
    async search() {
      this.$router.push({name:'search',params:{key:`${this.searchTerm}`}})
      console.log('Searching for:', this.searchTerm);
      /*let key=this.searchTerm
        console.log(key)
        let result=await axios.get(`http://localhost:5500/products/search/${key}`);
        console.log(result.data)
    this.products=result.data*/
    },
    logout(){
        localStorage.clear()
  },
  show() {
      this.showSidebar = true;
      document.addEventListener('click', this.handleOutsideClick);
    },
    onClickChild(val){
      if(val==false)
      {
        this.showSidebar=false;
      }
    }
    /*hide() {
  this.showSidebar = false;
  this.$refs.sidebar.style.display = 'none';
    },
    handleOutsideClick(event) {
  // check if the click was outside the sidebar element
  if (this.$refs.sidebar && !this.$refs.sidebar.contains(event.target)) {
    this.showSidebar = false;
  }
}*/
  },
 /* beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  },*/
};
</script>

<style scoped>
nav {
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.nav-left ul,
.nav-right form {
  display: flex;
  align-items: center;
  margin-top: 25px;
}

ul {
  display: flex;
  list-style: none;
  margin: 0;
  
  padding: 0;
}

li {
  margin-left: 1rem;
  font-size: 16px;
}

a {
  color: #fff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

input[type="text"] {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  border: none;
}

button[type="submit"] {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #130101;
  color: #fff;
  border: none;
  border-radius: 0.25rem;
  margin-left: 0.5rem;
}
</style>
