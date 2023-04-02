const client = require('./connection.js')
const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors())

app.listen(5500, ()=>{
    console.log("Sever is now listening at port 5500");
})

client.connect();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get('/products', (req, res)=>{
    client.query(`Select * from products`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

app.get('/products/:id', (req, res)=>{
    console.log("iiiii",req.params.id)
    client.query(`Select * from products where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


//signup
app.post('/users', (req, res)=> {
    const user = req.body;
    console.log(user);
    let insertQuery = `insert into users(name, email, password,address,pincode,phone) 
    values('${user.name}', '${user.email}', '${user.password}','${user.address}',${user.pincode},${user.phone})`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            //console.log(result)
            res.status(201).send(result.rows)


        }
        else{ 
            console.log(err)
            res.send('user already exist') }
    })
    client.end;
})

app.post('/login', (req, res)=>{
    const { phone, password } = req.body
    //console.log(email,password)
    client.query(`Select * from  users where phone=${phone} and password='${password}'`, (err, result)=>{
        if(!err){
            console.log(result.rows)
            res.status(201).send(result.rows);
        }
        else{
            res.send('invalid password or phone number')
        }
    });
    client.end;
})


//remove items from cart

app.post('/delete/:user/cart/:pid', (req, res)=> {
    const {user,pid} = req.params
    let quantity
    client.query(`delete from cart where fk_user_id=${user} and fk_product_id=${pid}`, (err, result) => {
        if(!err){
            res.send("deletion was successful")
        }
        else{
            console.log(err)
        }
    })
            /*else{
                
                quantity = result.rows[0].quantity
                console.log(quantity);
                client.query(`update cart set quantity = ${quantity} - 1 where fk_user_id = ${user} and fk_product_id = ${pid}`, (err, result) => {
                    if(!err){
                        res.send('Quantity updated')
                    }
                    else{
                        console.log(err);
                    }
                })
          }*/
        
    
    client.end;
})


//adding items in cart
app.post('/add/:user_id/cart/:idd', (req, res) => {
    const {user_id, idd} = req.params
    let quantity
    client.query(`select quantity from cart where fk_product_id = ${idd} and fk_user_id = ${user_id}`,
    (err, result) => {
        if(!err){
            // console.log(result.rows);
            console.log('hiiii')
            if(result.rows[0] == null){               
                client.query(`insert into cart(fk_product_id, quantity, fk_user_id) values(${idd}, 1, ${user_id})`, (err, result) => {
                    if(!err){
                        res.send("Insertion was successful")
                    }
                })
            }
            else{
                
                quantity = result.rows[0].quantity
                console.log(quantity);
                client.query(`update cart set quantity = ${quantity} + 1 where fk_user_id = ${user_id} and fk_product_id = ${idd}`, (err, result) => {
                    if(!err){
                        res.send('Quantity updated')
                    }
                    else{
                        console.log(err);
                    }
                })
            }
        }
        else{
            console.log(err)
        }
    })
    
    client.end;
})

//view items in cart

app.post('/cart/:user', (req, res)=>{
    const {user} = req.params
    //console.log('vvuyuyg',user)
    client.query(`Select p.*,c.quantity from products p JOIN cart c ON p.id=c.fk_product_id where c.fk_user_id=${user}`, (err, result)=>{
        if(!err){
            //console.log('hello',result.rows,err)
            res.status(201).send(result.rows);
        }
        else{
            res.send('invalid password or phone number')
        }
    });
    client.end;
})

//update task
/*app.post('/update', (req, res)=> {
    const {task_id,task,date}= req.body;
    //console.log(id,task,date);

    let insertQuery = `UPDATE task
    SET task_name = '${task}',task_date = '${date}' WHERE task_id='${task_id}'`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.status(201).send('update was successful')

        }
        else{ console.log(err.message) 
        res.send(err.message)}
    })
    client.end;
})

//delete task
app.post('/delete', (req, res)=> {
    const {idd}= req.body;
    //console.log(id,task,date);
    //console.log(task_id)
    let insertQuery = `DELETE FROM task
    WHERE task_id='${idd}'`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.status(201).send('delete was successful')

        }
        else{ console.log(err.message) 
        res.send(err.message)}
    })
    client.end;
})*/

//decrement quantity

app.post('/dec/:user/cart/:pid', (req, res)=> {
    const {user,pid} = req.params
    let quantity
    client.query(`select quantity from cart where fk_product_id = ${pid} and fk_user_id = ${user}`,
    (err, result) => {
        if(!err){
            // console.log(result.rows);
            console.log('hiiii')
            if(result.rows[0].quantity ==1){               
                client.query(`delete from cart where fk_user_id=${user} and fk_product_id=${pid}`, (err, result) => {
                    if(!err){
                        res.send("deletion was successful")
                    }
                })
            }
            else{
                
                quantity = result.rows[0].quantity
                console.log(quantity);
                client.query(`update cart set quantity = ${quantity} - 1 where fk_user_id = ${user} and fk_product_id = ${pid}`, (err, result) => {
                    if(!err){
                        res.send('Quantity updated')
                    }
                    else{
                        console.log(err);
                    }
                })
            }
        }
        else{
            console.log(err)
        }
    })
    
    client.end;
})

//inc item quantity

app.post('/inc/:user/cart/:pid', (req, res)=> {
    const {user,pid} = req.params
    let quantity
    client.query(`select quantity from cart where fk_product_id = ${pid} and fk_user_id = ${user}`,
    (err, result) => {
        if(!err){
            // console.log(result.rows);
            console.log('hiiii')
            /*if(result.rows[0].quantity ==1){               
                client.query(`delete from cart where fk_user_id=${user} and fk_product_id=${pid}`, (err, result) => {
                    if(!err){
                        res.send("deletion was successful")
                    }
                })
            }
            else{*/
                
                quantity = result.rows[0].quantity
                console.log(quantity);
                client.query(`update cart set quantity = ${quantity} + 1 where fk_user_id = ${user} and fk_product_id = ${pid}`, (err, result) => {
                    if(!err){
                        res.send('Quantity updated')
                    }
                    else{
                        console.log(err);
                    }
                })
        }
        else{
            console.log(err)
        }
    })
    
    client.end;
})
