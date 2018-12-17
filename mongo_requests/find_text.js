db.recettes.find({
"title" : {$regex : /.*poireaux.*/i}});