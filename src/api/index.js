
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


let recipeSchema = Schema({
  title:  String,
  picture: String,
  ingredients:Array,
  instructions: Array,
  temps: Array,
  saison: String,
  icon: String
});

let recipeModel = mongoose.model('recettes', recipeSchema);

app.get('/recettes', function(req, res) {
  recipeModel.find((error, feeds) => {
    if (error) throw error;
    res.send({ feeds });
  });
})

app.get('/title', function(req, res) {
  
})

// app.post('/account/create', function(req, res) {
//   console.log(req.body.email);
// })

app.listen(port, function() {
  let test = recipeModel.find({});
})

//  INSERT DATA:
  //   {"title":"Petits pois au chorizo",
  // "picture":"https://i.ibb.co/PCS1783/petits-pois-chorizo.jpg",
  // "ingredients":[
  //    { "name": "petit pois", "quantité": 1kg },
  //    { "name": "oignon", "quantité": 1 },
  //    { "name": "chorizo", "quantité": 1 et demi },
  //    { "name": "oeuf", "quantité": 1},
  //  ],
  // instructions: [
  //    { "name" :"Etape 1", "description":"Dans une marmite faites revenir à feu vif le chorizo coupé en dés sans matière grasse ( le chorizo en contient déjà !)."},
  //    { "name" :"Etape 2", "description":"Faites dorer pendant 5 à 6 min et ajoutez l'oignon émincé, une pointe de sel et laissez cuire jusqu'a ce qu'ils dorent eux aussi (4/5 min)."},
  //    { "name" :"Etape 3", "description":"Egouttez vos petits pois et ajoutez-les dans la marmite avec un demi verre d'eau ; touillez le tout et laissez cuire en baissant un peu le feu (moyen pendant 6/7 min)."},
  //    { "name" :"Etape 4", "description":"Vider le jus de la marmite et gardez-le dans un bol."},
  //    { "name" :"Etape 4", "description":"Etape très importante sinon c'est la bouillie assurée !"},
  //    { "name" :"Etape 4", "description":"Battez un oeuf en omelette, versez-le dans la préparation et remuez jusqu'à ce que l’œuf soit cuit, un peu comme un oeuf brouillé."},
  //  ],
  // temps: [
  //    {"name":"temps de cuisson","duree": 15}
  //  ]}

