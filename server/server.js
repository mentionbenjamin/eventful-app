const express = require('express');
const app = express();
const fetch = require('node-fetch')
const ApiKey = require('../api_key.js');
const MongoClient = require('mongodb').MongoClient;
const CreateRouter = require('./helpers/create_router.js');

const apiKey = new ApiKey();

var port = process.env.PORT || 3000;

app.use(express.static('client/public'))
MongoClient.connect('mongodb://localhost:27017')
.then((client) =>{
  const db = client.db('saved_events');
  const eventsCollection = db.collection('events');
  const eventRouter = CreateRouter(eventsCollection);
  app.use('/saved-events', eventsRouter);
})

app.get('/', function(req, res){
 res.sendFile('index.html');
});

app.get('/events/:lat/:long/:category/:mindate/:maxdate' , function(req, res){
   const lat = req.params.lat;
   const long = req.params.long;
   const category = req.params.category;
   const mindate = req.params.mindate;
   const maxdate = req.params.maxdate;

 const url = `https://www.skiddle.com/api/v1/events/search/?api_key=${apiKey.apiKey}&limit=100&order=goingto&latitude=${lat}&longitude=${long}&radius=10&eventcode=${category}&minDate=${mindate}&maxDate=${maxdate}`;

 fetch(url)
 .then(res =>  res.json())
 .then(data => res.json(data))
 .catch((err) =>{
   console.log(err);
 })


})



app.listen(port, function(){
 console.log('Our app is running on http://localhost:' + port)
})
