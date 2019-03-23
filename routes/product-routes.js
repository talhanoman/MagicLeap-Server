const Books = require('../models/books')

module.exports = function(app){
    // GET BOOKS API
app.get('/books', (req, res) => {
    Books.find((err, books) => {
        if (err) {
            throw err
        }
        res.json(books)
    })
    .limit(18)
})



// POST BOOKS API

app.post('/book', (req, res) => {
    let book = req.body
    Books.create(book, (err, books) => {
        if (err) {
            throw err
        }
        res.json(books)
    })

})

app.get('/books/:category',(req , res)=>{

    Books.find({
        category : {$in : req.params.category}
    })
    .exec((err, books)=>{
        if(err){
            throw err
        }
        res.json(books)
    })
 })

// DELETE BOOKS API

app.delete('/book/:_id', (req, res) => {

    let query = { _id: req.params._id }

    Books.findOneAndDelete(query, (err, books) => {
        if (err) {
            throw err
        }
        res.json(books)

    })
})

//  UPDATE BOOKS API

app.put('/book/:_id', (req, res) => {
    let book = req.body
    let query = { _id: req.params._id }
    // if Field doesnt exist set will make the fields
    let update = {
        '$set': {
            title: book.title,
            description: book.description,
            image: book.image,
            price: book.price,

        }
    }
    let options = { new: true }

    Books.findOneAndUpdate(query, update, options, (err, books) => {
        if (err) {
            throw err
        }
        res.json(books)

    })
})

}