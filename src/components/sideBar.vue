<!-- Sidebar component template -->
<template>
  <div class="sidebar">
    <!-- Sidebar content here -->
    <button id="btn" v-on:click="back">back</button>
    <h3 id="cat">Categories</h3><hr><br><br>
    <a href="menClothing">Men's clothing</a><hr>
    <a href="womenClothing">Women's Clothing</a><hr>
    <a href="/electronics">Electronics</a><hr>
    <a href="/jewellery">Jewellery</a><hr>
    
  </div>
</template>

<script>
export default {
  name:'sideBar',
  methods:{
    back(){
        this.$emit('clicked',false)
}
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  background-color: #363333;
  padding: 20px;
  padding-left: 0%;
}
#btn{
    float:left;
    margin-top: 310%;
    height: 10px;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}
#cat{
    display: flex;
    margin-top: 10px;
    margin-left: 0%;
    padding-left: 0%;
}
a:link {
  color: rgb(251, 253, 251);
  background-color: transparent;
  text-decoration: none;
}

a:visited {
  color: rgb(253, 223, 228);
  background-color: transparent;
  text-decoration: none;
}

a:hover {
  color: rgb(166, 250, 246);
  background-color: transparent;
  text-decoration: underline;
}

a:active {
  color: rgb(248, 211, 162);
  background-color: transparent;
  text-decoration: underline;
}

</style>
