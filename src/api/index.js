
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
  // quantity: Array,
  steps: Array,
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
  console.log(req.body);
  recipeModel.create({ 
    "title": req.body.title, 
    "picture": req.body.picture,
    "ingredients": req.body.ingredients, 
    "steps": req.body.steps,
    "temps": req.body.temps
  })
  console.log(`${req.body.temps}`);
});









//  LISTEN
app.listen(port, function() {
})

// "title" : "Fondant au chocolat",
// "picture" : "https://i.ibb.co/fpZbHW5/moelleux-emilie.jpg",
// "ingredients" : [ 
//     {
//         "name" : "oeufs",
//         "quantité" : 3,
//         "unity" : " "
//     }, 
//     {
//         "name" : "beurre",
//         "quantité" : 125,
//         "unity" : "g"
//     }, 
//     {
//         "name" : "sucre",
//         "quantité" : 125,
//         "unity" : "g"
//     }, 
//     {
//         "name" : "chocolat",
//         "quantité" : 1,
//         "unity" : "plaquette"
//     }, 
//     {
//         "name" : "farine",
//         "quantité" : 3,
//         "unity" : "cuillères à soupe"
//     }
// ],
// "steps" : [ 
//     {
//         "name" : "Etape 1",
//         "description" : "Mélanger les oeufs et le sucre jusqu'à ce que la préparation soit lisse."
//     }, 
//     {
//         "name" : "Etape 2",
//         "description" : "Faire fonde le chocolat et le beurre ensemble au bain-marie."
//     }, 
//     {
//         "name" : "Etape 3",
//         "description" : "Mélanger les deux préparation (beurre/chocolat dans la préparation oeufs/sucre)."
//     }, 
//     {
//         "name" : "Etape 4",
//         "description" : "Ajouter les 3 cuillères à soupe de farine."
//     }
// ],
// "temps" : [ 
//     {
//         "name" : "temps de cuisson",
//         "duree" : 20,
//         "thermostat" : 180
//     }
// ],
// "saison" : "dessert",
// "icon" : "https://image.flaticon.com/icons/svg/1375/1375194.svg"

