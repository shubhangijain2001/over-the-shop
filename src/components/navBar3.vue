<template>
<div>
    <nav>
  <sideBar1 />
    
    <div class="nav-right">
      <ul>
        <li><router-link to="/products">Home</router-link></li>
        <li><a v-on:click="logout " href="/signup">Logout</a></li>
      </ul>
    </div>
    </nav>
    </div>
</template>
<script>
import sideBar1 from "./sideBar1.vue"
//import router from "../routes/index"
export default {
  name: 'navBar3',
  components:{
    sideBar1,
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
  }
 /* beforeUnmount() {
    document.removeEventListener('click', this.handleOutsideClick);
  },*/
};
</script>

<style scoped>
nav {
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height:40px;
  margin-left: 220px;
  padding: 1rem;
}

.nav-left ul,
.nav-right form {
  display: flex;
  align-items: center;
  margin-top: 35px;
}

ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  margin-left: 1rem;
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
