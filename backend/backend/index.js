const client = require('./connection.js')
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const cors = require('cors')
app.use(cors())

app.listen(5500, ()=>{
    console.log("Sever is now listening at port 5500");
})

client.connect();
const bodyParser = require("body-parser");
const { log } = require('console');
app.use(bodyParser.json());


  

// Define API endpoint to send email
app.post('/api/send-order-email', (req, res) => {
  // Extract order data from request body
  const { name, email, order_id,total,order_items,order_date } = req.body;

  // Create a Nodemailer transport object with SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use the email service of your choice
    auth: {
      user: 'shubhangi2001jain@gmail.com', // Replace with your email address
      pass: 'nofkjafyfrjvwlyb' // Replace with your email password
    }
  });
  let MailGenerator = new Mailgen({
    theme: "default",
    product : {
        name: "Over the shop",
        link : 'https://over_the_shop.js/'
    }
})

let response = {
    body: {
        name : name,
        intro: `Your order is placed! Your Order ID: ${order_id}, total amount: $${total} and Order Date: ${order_date}` ,
        table : {
            data : order_items
},
        // order_date: order_date,
        // total_amount: total_amount,
        // payment_method: payment_method == "cod"? "Cash On Delivery" : "Via Debit/Credit Cart",
        
        outro: "Keep Shopping with us!"
    },
    
}
let mail = MailGenerator.generate(response)
  // Define email options
  const mailOptions = {
    from: 'shubhangi2001jain@gmail.com', // Replace with your email address
    to: email, // Recipient's email address
    subject: 'Order Confirmation', // Subject of the email
    html: mail// HTML content of the email
  };

  // Send the email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Failed to send email:', error);
      res.status(500).json({ message: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});
  



app.get('/products', (req, res)=>{
    client.query(`Select * from products`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

//category wise

app.get('/products/:cat', (req, res)=>{
    client.query(`Select * from products where category='${req.params.cat}'`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            console.log(err)
        }
    });
    client.end;
})

app.get('/getproducts/:idd', (req, res)=>{
    console.log("iiiii",req.params.idd)
    client.query(`Select * from products where id=${req.params.idd}`, (err, result)=>{
        if(!err){
            console.log('sending')
            res.send(result.rows);
        }
    });
    client.end;
})


//signup
app.post('/users', (req, res)=> {
    const user = req.body;
    console.log(user);
    let insertQuery = `insert into users(name, email, password,address,pincode,phone,type) 
    values('${user.name}', '${user.email}', '${user.password}','${user.address}',${user.pincode},${user.phone},'${user.type}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            console.log(result.rows)
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
            //console.log(result.rows)
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
                    else{
                        console.log(err)
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
    client.query(`Select p.*,c.quantity,c.order_id from products p JOIN cart c ON p.id=c.fk_product_id where c.fk_user_id=${user}`, (err, result)=>{
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
                client.query(`select quantity from cart where fk_product_id = ${pid} and fk_user_id = ${user}`, (err, result) => {
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
/*app.post('/inc/:user/cart/:pid', (req, res)=> {
    const {user,pid} = req.params
    let quantity
    client.query(`select quantity from cart where fk_product_id = ${pid} and fk_user_id = ${user}`,
    (err, result) => {
        if(!err){
            // console.log(result.rows);
            console.log('hiiii')
            /*if(result.rows[0].quantity ==1){               
                client.query(`select quantity from cart where fk_product_id = ${pid} and fk_user_id = ${user}`, (err, result) => {
                    if(!err){
                        res.send("deletion was successful")
                    }
                })
            }
            else{
                
           // quantity = result.rows[0].quantity
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
})*/


//search
/*SELECT *
FROM TEST
WHERE FIELD_KEY LIKE ANY (array['%this%', '%hel%']);*/

app.get('/products/search/:key', (req, res)=>{
    client.query(`Select * from products where title ilike any (array['%${req.params.key}%'])`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
        else{
            console.log(err)
            res.send('not found')
        }
    });
    client.end;
})

//adding items in wishlist

app.post('/add/:user_id/wishlist/:idd', (req, res) => {
    const {user_id, idd} = req.params      
    client.query(`insert into wishlist(fk_product_id,fk_user_id) values(${idd}, ${user_id})`, (err, result) => {
                    if(!err){
                        res.send("Insertion was successful")
                    }
                    else{
                        console.log(err)
                    }
                })
    client.end;
})

//view items in wishlist

app.post('/wishlist/:user', (req, res)=>{
    const {user} = req.params
    //console.log('vvuyuyg',user)
    client.query(`Select p.* from products p JOIN wishlist w ON p.id=w.fk_product_id where w.fk_user_id=${user}`, (err, result)=>{
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

//remove items from wishlist

app.post('/delete/:user/wishlist/:pid', (req, res)=> {
    const {user,pid} = req.params
    let quantity
    client.query(`delete from wishlist where fk_user_id=${user} and fk_product_id=${pid}`, (err, result) => {
        if(!err){
            res.send("deletion was successful")
        }
        else{
            console.log(err)
        }
    })
    client.end;
})


//admin side


//count products
app.get('/countproducts', (req, res)=>{
    client.query(`Select COUNT(*) from products`, (err, result)=>{
        if(!err){
            //console.log(result.rows)
            res.send(result.rows);

        }
    });
    client.end;
})

//count users
app.get('/countusers', (req, res)=>{
    client.query(`Select COUNT(*) from users`, (err, result)=>{
        if(!err){
            //console.log(result.rows)
            res.send(result.rows);

        }
    });
    client.end;
})

//count orders
app.get('/countorders', (req, res)=>{
    client.query(`Select COUNT(*) from orders`, (err, result)=>{
        if(!err){
            //console.log(result.rows)
            res.send(result.rows);

        }
    });
    client.end;
})

//total sales
app.get('/sales', (req, res)=>{
    client.query(`Select * from orders`, (err, result)=>{
        if(!err){
            //console.log(result.rows)
            res.send(result.rows);


        }
    });
    client.end;
})


//add a new product

app.post('/addproduct', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into products(id,title, price, description, category, image, rate, count) 
    values(${user.id},'${user.title}', ${user.price}, '${user.description}','${user.category}','${user.image}',${user.rate},${user.count})`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            //console.log(result)
            res.status(201).send('product added')


        }
        else{ 
            console.log(err)
            res.send('unable to add product') }
    })
    client.end;
})

//remove product

app.post('/removeproduct/:idd', (req, res)=> {
    const {idd}= req.params
    console.log(idd)
    client.query(`delete from products where id=${idd}`, (err, result) => {
        if(!err){
            res.send("deletion was successful")
        }
        else{
            console.log(err)
        }
    })
    client.end;
})

//update product
app.post('/updateproduct', (req, res)=> {
    const {idd,title,price,description,category,image,rate,count}= req.body;
    console.log(idd,title,price,description,category,image,rate,count);

    let insertQuery = `UPDATE products
    SET title='${title}',price=${price},description='${description}', category='${category}',image='${image}',rate=${rate},count=${count} WHERE id='${idd}'`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.status(201).send('update was successful')

        }
        else{ console.log(err.message) 
        res.send(err.message)}
    })
    client.end;
})

//all users

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            //console.log(result.rows)
            res.send(result.rows);

        }
    });
    client.end;
})

//remove user

app.post('/removeUser/:uid', (req, res)=> {
    const {uid}= req.params
    console.log(uid)
    client.query(`delete from users where id=${uid}`, (err, result) => {
        if(!err){
            res.send("deletion was successful")
        }
        else{
            console.log(err)
        }
    })
    client.end;
})

//proceed to checkout

//orders
app.post('/orders', (req, res)=> {
    const user = req.body;
    console.log(user)
    let insertQuery = `insert into orders(fk_user_id,address,total,del_mode,ord_date) 
    values(${user.user_id},'${user.add}', ${user.total},'${user.mode}','${user.ord_date}')`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            console.log(result)
            res.status(201).send('orderplaced')
        }
        else{ 
            console.log(err)
            res.send('unable to place order') }
    })
    client.end;
})

//get order details

app.get('/getorders/:id', (req, res)=>{
    console.log("iiiii",req.params.idd)
    client.query(`Select * from orders where fk_user_id=${req.params.id}`, (err, result)=>{
        if(!err){
            console.log('sending')
            res.send(result.rows);
        }
    });
    client.end;
})

//history

app.post('/history', (req, res)=> {
    const user = req.body;
    console.log(user)
    let insertQuery = `insert into history(fk_user_id,fk_product_id,quantity) 
    values(${user.user_id},${user.product_id}, ${user.quantity})`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            //console.log(result)
            res.status(201).send('history saved')
        }
        else{ 
            console.log(err)
            res.send('history not saved') }
    })
    client.end;
})

app.post('/gethistory/:user', (req, res)=>{
    const {user} = req.params
    //console.log('vvuyuyg',user)
    client.query(`Select p.*,o.*,h.* from products p INNER JOIN history h ON p.id=h.fk_product_id INNER JOIN orders o ON o.fk_user_id=h.fk_user_id where h.fk_user_id=${user}`, (err, result)=>{
        if(!err){
            //console.log('hello',result.rows,err)
            //console.log(result.rows)
            res.status(201).send(result.rows);
        }
        else{
            console.log(err)
            res.send('invalid password or phone number')
        }
    });
    client.end;
})

//empty cart

app.post('/emptyCart/:id', (req, res)=> {
    const {id}= req.params
    console.log(id)
    client.query(`delete from cart where fk_user_id=${id}`, (err, result) => {
        if(!err){
            res.send("deletion was successful")
        }
        else{
            console.log(err)
        }
    })
    client.end;
})

//allOrders

app.get('/allOrders', (req, res)=>{
    //console.log("iiiii",req.params.idd)
    client.query(`Select h.*,p.*,u.* from history h JOIN users u on h.fk_user_id=u.id JOIN products p on p.id=h.fk_product_id`, (err, result)=>{
        if(!err){
            console.log(result.rows)
            res.send(result.rows);
        }
        else{
            console.log(err)
        }
    });
    client.end;
})

//update quantity

app.post('/updateQuantity', (req, res)=> {
    const {quan,product_id}= req.body;
    console.log('result',quan,product_id);

    let insertQuery = `UPDATE products
    SET count=count-${quan} WHERE id=${product_id}`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.status(201).send('update was successful')

        }
        else{ console.log(err.message) 
        res.send(err.message)}
    })
    client.end;
})