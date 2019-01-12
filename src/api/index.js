
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
//  HIVER

  // "title":"Saucisses lentilles",
  // "picture":"https://i.ibb.co/k19s0r7/lentilles-et-saucisses-thermomix-800x600.jpg",
  // "ingredients":[
  //    { "name": "lentilles vertes", "quantité": 250 },
  //    { "name": "saucisses de Morteau", "quantité": 4 },
  //    { "name": "oignons", "quantité": 2 },
  //    { "name": "carottes", "quantité": 2 },
  //    { "name": "lardons fumés", "quantité": 100 }
  //  ],
  // "instructions": [
  //    { "name" :"Etape 1", "description":"Piquer les saucisses avec une fourchette."},
  //    { "name" :"Etape 2", "description":"Après mettez-les dans 1,5 litre d'eau froide, avec le bouquet garni et la carotte coupée en rondelles. Faites cuire à gros bouillons pendant 15 à 20 min."},
  //    { "name" :"Etape 3", "description":"Pendant ce temps, faites revenir les lardons dans une poêle, juste pour qu'ils soient légèrement dorés et croquants."},
  //    { "name" :"Etape 4", "description":"Ajoutez les lardons, les oignons blancs et les lentilles dans le faitout des saucisses. Ne salez pas, les lardons le feront."},
  //    { "name" :"Etape 5", "description":"Couvrez et faites cuire le tout à feu doux de 20 à 25 min."}
  //  ],
  // "temps": [
  //    {"name":"temps de cuisson","duree": 25, "temps":"minutes"}
  //  ],
  // "legume": "lentilles vertes",
  // "saison" : "hiver",
  // "icon": "https://image.flaticon.com/icons/svg/1337/1337709.svg"

// ETE

  // "title":"Velouté de courgettes",
  // "picture":"https://i.ibb.co/H4S1SXZ/courgettes.jpg",
  // "ingredients":[
  //    { "name": "courgettes", "quantité": 700 },
  //    { "name": "vache qui rit", "quantité": 5 },
  //    { "name": "bouillon cube", "quantité": 2 },
  //    { "name": "ail", "quantité": 2 }
  //  ],
  // "instructions": [
  //    { "name" :"Etape 1", "description":"Mettre à chauffer l'eau, les cubes de bouillon, la vache qui rit, l'ail écrasé, les courgettes coupées en morceaux avec la peau; sel et poivre."},
  //    { "name" :"Etape 2", "description":"Laisser cuire environ 40 min (quand la courgette est tendre)."},
  //    { "name" :"Etape 3", "description":"Mixer le tout, et déguster"},
  //    { "name" :"Etape 4", "description":"Cette recette va réconcilier les enfants avec la soupe! La peau de la courgette donne toute la couleur à la soupe."}
  //  ],
  // "temps": [
  //    {"name":"temps de cuisson","duree": 40 }
  //  ],
  // "legume": "courgettes",
  // "saison" : "été",
  // "icon": "https://image.flaticon.com/icons/svg/1375/1375195.svg"

  // AUTOMNE

  // "title":"Lasagnes bolognaises",
  // "picture":"https://i.ibb.co/r4LfGWZ/lasagnes.jpg",
  // "ingredients":[
  //    { "name": "pates à lasagne", "quantité": 1 },
  //    { "name": "oignons", "quantité": 3 },
  //    { "name": "ail", "quantité": 2 },
  //    { "name": "carottes", "quantité": 1 },
  //    { "name": "boeuf haché", "quantité": 600 },
  //    { "name": "fromage rapé", "quantité": 70 },
  //    { "name": "vin rouge", "quantité": 20}
  //  ],
  // "instructions": [
  //    { "name" :"Etape 1", "description":"Faire revenir gousses hachées d'ail et les oignons émincés dans un peu d'huile d'olive."},
  //    { "name" :"Etape 2", "description":"Ajouter la carotte et la branche de céleri hachée puis la viande et faire revenir le tout."},
  //    { "name" :"Etape 3", "description":"Au bout de quelques minutes, ajouter le vin rouge. Laisser cuire jusqu'à évaporation."},
  //    { "name" :"Etape 4", "description":"Ajouter la purée de tomates, l'eau et les herbes. Saler, poivrer, puis laisser mijoter à feu doux 45 minutes."},
  //    { "name" :"Etape 5", "description":"Préparer la béchamel."},
  //    { "name" :"Etape 6", "description":"Préchauffer le four à 200°C (thermostat 6-7). Huiler le plat à lasagnes. Poser une fine couche de béchamel puis des feuilles de lasagnes, de la bolognaise, de la béchamel et du parmesan. Répéter l'opération 3 fois de suite."}
  //  ],
  // "temps": [
  //    {"name":"temps de cuisson","duree": 25 }
  //  ],
  // "legume": "boeuf"

  // DESSERT

  // "title":"vrai cheese cake",
  // "picture":"https://cache.marieclaire.fr/data/photo/w1000_ci/54/cheese-cake-express.jpg",
  // "ingredients":[
  //    { "name": "palets bretons", "quantité": 250 },
  //    { "name": "beurre fondu", "quantité": 80 },
  //    { "name": "Philadelphia", "quantité": 500 },
  //    { "name": "farine", "quantité": 150 },
  //    { "name": "oeufs", "quantité": 3 },
  //    { "name": "sucre en poudre", "quantité": 125 }
  //  ],
  // "instructions": [
  //    { "name" :"Etape 1", "description":"Préchauffer le four à 160°C."},
  //    { "name" :"Etape 2", "description":"Mélanger les miettes de biscuit avec le beurre fondu."},
  //    { "name" :"Etape 3", "description":"Tassez bien au fond de votre moule (pas besoin de le graisser au préalable). Vous pouvez aussi si vous avez plus de miettes, les faire remonter légèrement sur les bords. Passez le moule 10 minutes dans le four chaud, puis sortir."},
  //    { "name" :"Etape 4", "description":"Battez au fouet électrique le fromage avec les jaunes d’œuf, le sucre en poudre, l’extrait de vanille, puis incorporez délicatement les blancs en neige, pour plus de moelleux.Versez la crème sur le fond biscuité. Cuisez 30 min environ, le centre devra être encore bien humide (enfoncer un cure-dent pour tester sans faire trop de dégâts…)."},
  //    { "name" :"Etape 5", "description":"Voici maintenant mes super astuces pour évitez que votre cheesecake ne se fissure en subissant un choc de température : Ne sortez pas votre cheesecake du four tout de suite ! Attendez porte fermée que le four refroidisse 5 minutes. Puis ouvrez la porte du four pendant 5 à 10 minutes.Faites prendre ensuite le cheesecake au frigo au moins 3h avant de servir (ou préparez-le la veille). Sortez-le gâteau au fromage américain du frigo 30 minutes avant de déguster !."}
  //  ],
  // "saison" : "dessert",
  // "icon": "https://image.flaticon.com/icons/svg/1375/1375194.svg"

  