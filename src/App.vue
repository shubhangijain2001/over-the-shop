<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
//import NavBar from './components/NavBar.vue';
//import navBar1 from "./components/navBar1.vue"
export default {
  name: 'App',
  /*components: {
    //NavBar,
    navBar1,
  }*/
}
</script>

<style>
  * {
    box-sizing: border-box;
    font-family: Arial;
    padding:0px
  }

  #page-wrap {
    margin: auto;
    max-width: 800px;
    min-height: 100vh;
  }

  button {
    background-color: black;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    outline: 0;
    padding: 16px;
  }
</style>
