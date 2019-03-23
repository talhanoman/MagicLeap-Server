const mongoose = require('mongoose')

// Mlab Connection

var db_url = 'mongodb://talha61:terrybogard1@ds015953.mlab.com:15953/finalproject1'
mongoose.connect(db_url, { useNewUrlParser: true })
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () { console.log('Successfully connected to DB') });


module.exports = db