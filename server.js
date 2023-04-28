const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const port = 3000
var db, collection;

const url = "mongodb+srv://hernandezpatriciam:8pYMda8cUPOxpWF7@cluster0.pu5jnrf.mongodb.net/?retryWrites=true&w=majority";
const dbName = "entertainment";

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('shows').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/show', (req, res) => {
  db.collection('shows').insertOne({show: req.body.show}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.delete('/shows', (req, res) => {
  db.collection('shows').findOneAndDelete({show: req.body.show}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})