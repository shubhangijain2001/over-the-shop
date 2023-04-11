<!-- Sidebar component template -->
<template>
  <div class="sidebar">
    <!-- Sidebar content here -->
    <h2>Dashboard</h2><hr>
    <ul>
        <li><b>Products</b></li>
        <ul class="ul1">
        <li><router-link to="/addProduct">Add Product</router-link></li>
        <li><router-link to="/removeProduct">Modify Products</router-link></li>
        </ul>
        
      </ul><br>

      <ul>
        <li><b>Views</b></li>
        <ul class="ul1">
        <li><router-link to="/allUsers">Users</router-link></li>
        <li><router-link to="/allOrders">Orders</router-link></li>
        <li><router-link to="/allProducts">Products</router-link></li>
        </ul>
        
      </ul>

    
  </div>
</template>

<script>
export default {
  name:'sideBar',
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 230px;
  height: 100%;
  background-color: #363333;
  padding: 20px;
  padding-left: 30px;
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
#ul li{
    /* adjust the value to your desired text size */
  padding-left: 10px; 
 
}
li{
     margin-bottom: 15px;
     border-bottom: 1px solid rgb(65, 65, 65);
     font-size:14px;
}
.ul1{
    margin-left:30px;
    
}
ul{
    list-style-type: none;
}
/*select {
  font-size: 15px; /*adjust the value to your desired text size */
  /*padding: 5px; adjust the value to set padding around the dropdown list */
  /*width: 150px; /* adjust the value to set the width of the dropdown list */
  /*background-color: #363333; /* set the background color of the dropdown list */
  /*border: none; /* remove the default border of the dropdown list */
  /*outline: none; /* remove the default outline of the dropdown list 
  color:rgb(251, 253, 251);
}
/*option{
    margin-bottom: 25px;
     border-bottom: 1px solid rgb(65, 65, 65);
}
<select name="products">
    <option value="products" selected disabled>Products</option> 
  <option value="add"><a href="/addProduct">Add a product</a></option>
  <option value="remove"><a href="/removeProduct">Remove product</a></option>
  <option value="update_price"><a>Update product price</a></option>
  <option value="update_quantity"><a>Update quantity</a></option>
</select><br><br>
<select name="products">
    <option value="views" selected disabled>View</option> 
  <option value="users"><a>Users</a></option>
  <option value="orders"><a>Orders</a></option>
  <option value="products"><a>Products</a></option>
</select>
    */

</style>
