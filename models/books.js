const mongoose = require('mongoose')

const booksSchema  = mongoose.Schema({
    title : String,
    description : String,
    images : String,
    category : String,
    price : Number
})

const books  = mongoose.model('Books', booksSchema)

module.exports = books