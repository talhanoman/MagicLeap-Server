const mongoose = require('mongoose')

const emailsSchema  = mongoose.Schema({
    email : String
})

const emails  = mongoose.model('emails', emailsSchema)

module.exports = emails