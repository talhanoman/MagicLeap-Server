const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)


// Importing database models


const Email = require('./models/emails')
const Order = require('./models/orders')

// MiddleWare to define folder for static files
app.use(express.static('./build'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))



// Important middlewares
app.use(cookieParser())


// Importing Routes
require('./routes/product-routes')(app)

// Importing database connection
const db = require('./db/config')

// Set Up Sessions 

app.use(session({
    secret: 'mySecretString',
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection: db, ttl: 2 * 24 * 60 * 60 }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 2 }
}))

// Save Session  cart API
app.post('/cart', (req, res) => {
    let cart = req.body;
    req.session.cart = cart
    req.session.save((err) => {
        if (err) {
            throw err
        }
        res.json(req.session.cart)
    })
})

// GET Session Cart API

app.get('/cart', (req, res) => {
    if (typeof req.session.cart !== undefined) {
        res.json(req.session.cart)
    }
})
 

// Email Subcription

  
app.post('/email',(req,res)=>{
    let email = {email : req.body.email}
    let newEmail = new Email(email); 
    newEmail.save()
      .then((data)=> {
        res.json(data)
       })
     .catch((err)=>{
         if(err){
             throw err
         }
     })
})

app.post('/order', (req, res)=>{
    let order = req.body.order
   let newOrder = new Order(order)
    newOrder.save()
    .then((data)=>{
        res.json(data)
        console.log("Order Submitted!")
    })
    .catch((err)=>{
        if(err){
            throw err
        }
    })
})





app.listen(3001, function () {
    console.log('App is listening on port 3001')
})