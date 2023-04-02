<template>
  <nav>
    <h2>OVER THE SHOP</h2>
    <div class="nav-left">
      <ul>
        <li><router-link to="/products">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><router-link to="/cart">Cart</router-link></li>
        <li><a v-on:click="logout " href="/signup">Logout</a></li>
      </ul>
    </div>
    <div class="nav-right">
      <form @submit.prevent="search">
        <input type="text" v-model="searchTerm" placeholder="Search...">
        <button type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navBar1',
  data() {
    return {
      searchTerm: '',

    };
  },
  methods: {
    search() {
      // do something with the search term
      console.log('Searching for:', this.searchTerm);
    },
    logout(){
        localStorage.clear()
  },
  }
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
