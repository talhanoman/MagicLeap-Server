const mongoose = require('mongoose')

const ordersSchema  = mongoose.Schema({
    fullname : String,
    email : String,
    address : String
})

const orders  = mongoose.model('Orders', ordersSchema)

module.exports = orders