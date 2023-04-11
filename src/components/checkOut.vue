<template>
<div id="div-nav">
    <h2>Enter card details to pay</h2>
</div>
    <div id="divpay">
        <form action="">
            <label for="">Card number</label>
            <input type="text" v-model="cnum" placeholder="Card number"><br>
            <label for="dateInput">Expiry Date</label>
            <input id="dateInput" type="text" v-model="inputDate" @input="onInput" placeholder="MM/YYYY" /><br>
            <label for="">CVV</label>
            <input type="text" v-model="cvv" placeholder="cvv"><br>
            <button v-on:click="pay">Pay now</button>
        </form>
    </div>
</template>

<script>
export default {
    name:'checkOut',
    data(){
        return{
            cnum:'',
            mon:'',
            year:'',
            cvv:''
        }
    },
   computed: {
    formattedDate() {
      // Format the inputDate into "MM/YYYY" format
      const month = this.inputDate.slice(0, 2);
      const year = this.inputDate.slice(2);
      return `${month}/${year}`;
    }
  },
  methods: {
    onInput() {
      // Remove any non-numeric characters from inputDate
      this.inputDate = this.inputDate.replace(/[^0-9]/g, '');
    },
    pay(){
        this.$router.push({name:'order'})
    }
  },
  created(){
        if(JSON.parse(localStorage.getItem('user')).type=='user'){
            this.$router.push({name:'checkout'})
        }
    },
    mounted(){
        if(JSON.parse(localStorage.getItem('user')).type=='user'){
            this.$router.push({name:'checkout'})

        }
        else{
            this.$router.push({name:'login'})
        }
    }
}
</script>

style <style scoped>
#divpay{
    display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  align-items: center;
  margin-top: 100px;
}
#div-nav{
    background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  height:100px
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
button{
    align-items: center;
}
</style>