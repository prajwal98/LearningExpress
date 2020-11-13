const express = require("express")
const bodyPaser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

//Make Aure you place BodyPaser before your CRUD handlers

const connectionString = 'mongodb+srv://test:ursprajwal1@@cluster0.9olko.mongodb.net/test?retryWrites=true&w=majority';

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
}).then(client => {
    app.set('view engine', 'ejs')
    app.use(bodyPaser.urlencoded({ extended: true}))

    console.log('Connected to Database');
    const db = client.db('star-wars-quotes')
    
    const quotesCollection = db.collection('quotes')
    app.get('/', (req, res) => {
        
        db.collection('quotes').find().toArray()
        .then(results => {
            res.render('index.ejs', { quotes: results})
        })
        .catch(error => console.error(error))
        
    })

app.post('/quotes', (req,res) => {
    quotesCollection.insertOne(req.body)
    .then(result => {
        res.redirect('/');
    })
    .catch(error => console.error(error))
})
app.listen(3001, ()=> {
    console.log('App is listening at port localhost:3001');
})
}).catch(console.error)
