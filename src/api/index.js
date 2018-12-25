
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

  // "title":"Petits pois au chorizo",
  // "picture":"https://i.ibb.co/PCS1783/petits-pois-chorizo.jpg",
  // "ingredients":[
  //    { "name": "petit pois", "quantité": 1 },
  //    { "name": "oignon", "quantité": 1 },
  //    { "name": "chorizo", "quantité": 1 },
  //    { "name": "oeuf", "quantité": 1 }
  //  ],
  // instructions: [
  //    { "name" :"Etape 1", "description":"Dans une marmite faites revenir à feu vif le chorizo coupé en dés sans matière grasse ( le chorizo en contient déjà !)."},
  //    { "name" :"Etape 2", "description":"Faites dorer pendant 5 à 6 min et ajoutez l'oignon émincé, une pointe de sel et laissez cuire jusqu'a ce qu'ils dorent eux aussi (4/5 min)."},
  //    { "name" :"Etape 3", "description":"Egouttez vos petits pois et ajoutez-les dans la marmite avec un demi verre d'eau ; touillez le tout et laissez cuire en baissant un peu le feu (moyen pendant 6/7 min)."},
  //    { "name" :"Etape 4", "description":"Vider le jus de la marmite et gardez-le dans un bol."},
  //    { "name" :"Etape 4", "description":"Etape très importante sinon c'est la bouillie assurée !"},
  //    { "name" :"Etape 4", "description":"Battez un oeuf en omelette, versez-le dans la préparation et remuez jusqu'à ce que l’œuf soit cuit, un peu comme un oeuf brouillé."}
  //  ],
  // temps: [
  //    {"name":"temps de cuisson","duree": 15},
  //    {"duree": 20 }
  //  ],
  // "legume": "petit pois",
  // "saison" : "printemps",
  // "icon": "https://image.flaticon.com/icons/svg/765/765778.svg"

