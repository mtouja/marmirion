
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my-recipes()', { useNewUrlParser: true });
let Schema = mongoose.Schema;
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    
    next();
  }
});

// SCHEMA
let recipeSchema = Schema({
  title:  String,
  picture: String,
  ingredients:Array,
  instructions: Array,
  temps: Array,
  saison: String,
  icon: String
});

//  MODEL
let recipeModel = mongoose.model('recettes', recipeSchema);

// ROUTES
app.get('/recettes',(req, res) => {
  recipeModel.find((error, feeds) => {
    console.log(feeds)
    if (error) throw error;
    res.send(feeds);
  });
})

app.post('/recettes/new',(req, res) => {
  (`http://localhost:8000/recettes/new`)
  console.log(req.body);
  recipeModel.create({ 
    "title": req.body.title, 
    "ingredients": req.body.ingredients, 
    "instructions": req.body.steps })
  console.log(`${title}`);
});




//  LISTEN
app.listen(port, function() {
})
