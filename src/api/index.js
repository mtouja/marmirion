
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
  quantity: Array,
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
    "quantity":req.body.quantity
  })
  console.log(`${req.body.title}`);
});









//  LISTEN
app.listen(port, function() {
})

<<<<<<< Updated upstream
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
=======
// "_id" : ObjectId("5c12308ed5c25c06ca522680"),
    // "title" : "Tarte poireaux lardons",
    // "picture" : "https://i.ibb.co/6FDQYDf/Tarte-feuillete-e-1-part.jpg",
    // "ingredients" : [ 
    //     {
    //         "name" : "poireaux",
          
    //     }, 
    //     {
    //         "name" : "lardons",
          
    //     }, 
    //     {
    //         "name" : "oeufs",
            
    //     }, 
    //     {
    //         "name" : "fromage rapé",
            
    //     }, 
    //     {
    //         "name" : "crême fraîche",
       
    //     }, 
    //     {
    //         "name" : "Sel, poivre et beaucoup de muscade"
    //     }
    // ],
    // "quantity" : [
    //                { 3 },
    //                { 400 }
    // ],
    // "steps" : [ 
    //     {
    //         "name" : "Etape 1",
    //         "description" : "Préchauffer le four à 210°C (thermostat 7)."
    //     }, 
    //     {
    //         "name" : "Etape 2",
    //         "description" : "Emincer les poireaux. Les faire dorer dans un peu de beurre (beaucoup de beurre!)."
    //     }, 
    //     {
    //         "name" : "Etape 3",
    //         "description" : "Faire dorer les lardons à part."
    //     }, 
    //     {
    //         "name" : "Etape 4",
    //         "description" : "Les égoutter soigneusement avant de les ajouter aux poireaux."
    //     }, 
    //     {
    //         "name" : "Etape 5",
    //         "description" : "Faire l'appareil: mêler les oeufs, la crême, le sel, le poivre et la muscade(miam)."
    //     }, 
    //     {
    //         "name" : "Etape 6",
    //         "description" : "Etaler les poireaux et les lardons sur la pâte."
    //     }, 
    //     {
    //         "name" : "Etape 7",
    //         "description" : "Parsemer de gruyère râpé, couvrir avec l'appareil."
    //     }
    // ],
    // "temps" : [ 
    //     {
    //         "name" : "temps de cuisson",
    //         "duree" : 25.0
    //     }
    // ],
    // "legume" : "poireaux",
    // "saison" : "automne",
    // "icon" : "https://image.flaticon.com/icons/svg/1147/1147560.svg"
>>>>>>> Stashed changes

