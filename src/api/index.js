
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
});

let recipeModel = mongoose.model('recettes', recipeSchema);

app.get('/recettes', function(req, res) {
  recipeModel.find((error, feeds) => {
    if (error) throw error;
    res.send({ feeds });
  });
})

app.get('/test', function(req, res) {
  res.send('test')
});

app.post('/account/create', function(req, res) {
  console.log(req.body.email);
})

app.listen(port, function() {
  let test = recipeModel.find({});
})

//  INSERT DATA:
  //   {"title":"Poireaux Béchamel",
  // "picture":"https://i.ibb.co/58j5rwZ/poireaux-bechamel.jpg",
  // "ingredients":[
  //    { "name": "jambon", "quantité":6 },
  //    { "name": "poireaux", "quantité":3 },
  //    { "name": "beurre", "quantité":50 },
  //    { "name": "lait", "quantité":0.5 },
  //    { "name": "farine", "name":"60" },
  //    { "name": "fromage rapé", "name":"100" },
  //  ],
  // instructions: [
  //    { "name" :"Etape 1", "description":"Faites cuire les blancs de poireaux à la vapeur, à l'eau ou au micro-ondes jusqu'à ce qu'ils soient tendres."},
  //    { "name" :"Etape 2", "description":"Préparez la béchamel : dans une casserole, faites fondre le beurre puis ajoutez la farine. Mélangez vigoureusement avec un fouet. Laissez cuire 2 mn puis versez petit à petit le lait tout en fouettant. Laissez cuire jusqu'à ce que le mélange épaississe et soit onctueux."},
  //    { "name" :"Etape 3", "description":"Coupez les poireaux en 2 cylindres égaux, roulez une tranche de jambon autour de chaque morceau."},
  //    { "name" :"Etape 4", "description":"Disposez-les dans un plat carré, étalez la béchamel sur les roulés et saupoudrez enfin de fromage râpé."},
  //  ],
  // temps: [
  //    {"name":"temps de cuisson","duree": 30}
  //  ]}

