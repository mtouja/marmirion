
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my-recipes()', { useNewUrlParser: true });
let Schema = mongoose.Schema;
const port = 8000;

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
app.get('/recettes', function(req, res) {
  recipeModel.find((error, feeds) => {
    console.log(feeds)
    if (error) throw error;
    res.send(feeds);
  });
})

app.get('/title/:title', function(req, res) {
  recipeModel.find({"title": req.params.title},(error, result) => {
    console.log(req.params.title)
    if (error) throw error;
    res.send(result);
  });
})

app.get('/saison/:saison', function(req, res) {
  recipeModel.find({"saison": req.params.saison},(error, result) => {
    console.log(req.params.saison)
    if (error) throw error;
    res.send(result);
  });
})

app.get('/legume/:legume', function(req, res) {
  recipeModel.find({"legume": req.params.legume},(error, result) => {
    console.log(req.params.legume)
    if (error) throw error;
    res.send(result);
  });
})

//  LISTEN
app.listen(port, function() {
})



//  INSERT DATA:

  // "title":"Velouté de courgettes",
  // "picture":"https://i.ibb.co/7rJZhK2/velout-courgettes.jpg",
  // "ingredients":[
  //    { "name": "courgettes", "quantité": 1 },
  //    { "name": "vache qui rit", "quantité": 2 },
  //    { "name": "bouillon cube", "quantité": 1 }
  //  ],
  // "instructions": [
  //    { "name" :"Etape 1", "description":"Laver les courgettes les couper en dés (ne pas éplucher) placer tous les ingrédients dans une cocotte minute sur un fond d'eau (pour ne pas attraper au démarrage de la cuisson)."},
  //    { "name" :"Etape 2", "description":"(ne surtout pas saler, le bouillon cube s'en charge)."},
  //    { "name" :"Etape 3", "description":"Fermer la cocotte, démarrer la cuisson."},
  //    { "name" :"Etape 4", "description":"Au sifflement laisser cuire 5 mn. Mixer le tout, et bon appétit."}
  //  ],
  // "temps": [
  //    {"name":"temps de cuisson","duree": 15}
  //  ],
  // "legume": "courgettes",
  // "saison" : "été",
  // "icon": "https://image.flaticon.com/icons/svg/1375/1375195.svg"

