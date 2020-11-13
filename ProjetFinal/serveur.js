const express = require('express'); 
const bodyParser=require("body-parser"); 
const mongoose = require("mongoose"); 
const session = require('express-session'); 


const app = express(); 
const port = 4200; 
 
app.use(bodyParser.json()); 
app.use(express.static('public')); 
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({  secret: 'secret',  
resave: true,  saveUninitialized: true })); 
 
app.use(function (request, response, next) {     response.setHeader("Access-Control-Allow-Origin", "*");     
response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');     
response.setHeader("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");    
response.setHeader('Access-Control-Allow-Credentials', true); next(); }); 

app.use(express.json()); 
 
mongoose.connect('mongodb+srv://admin:admin1234@clustergym.noibn.mongodb.net/GymNCook?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }); 
let db=mongoose.connection; 
db.on('error', console.log.bind(console, "Echec de connexion à la BD Mongo...")); 

db.once('open', function(callback){ 
    console.log("Connecté à la BD Mongo..."); 
}) 

const membreSchema = new mongoose.Schema({  
    username: {
        type: String 
    },    
    prenom: {
        type: String 
    },    
    nom: {
        type: String 
    },   
    entreprise: {
        type: String 
    },    
    telephone: {
        type: String 
    },
    cellulaire: {
        type: String 
    },         
    email: {
        type: String 
    },    
    adresse: {
        type: String 
    },    
    zipCode : {
        type: String
    },
    ville: {
        type: String 
    },
    province: {
        type: String 
    },
    pays: {
        type: String
    },
    travail: {
        type: String 
    },

    password: {
        type: String 
    }
});

const membreModel = mongoose.model("membre", membreSchema); 

app.post('/membre', function(request,response){ 
    let username = request.body.username;
    let prenom = request.body.prenom;
    let nom = request.body.nom;
    let entreprise = request.body.entreprise;
    let telephone = request.body.telephone;
    let cellulaire = request.body.cellulaire;
    let email = request.body.email;
    let adresse = request.body.adresse;
    let zipCode = request.body.zipCode;
    let ville =  request.body.ville;
    let province = request.body.province;
    let pays = request.body.pays;
    let travail = request.body.travail;  
    let password = request.body.password;  
  
    let data = { 
    "username" : username,
    "prenom" : prenom,
    "nom" : nom,
    "entreprise" : entreprise,
    "telephone" : telephone,
    "cellulaire" : cellulaire,
    "email" : email,
    "adresse" : adresse,
    "zipCode" : zipCode,
    "ville" : ville,
    "province" : province,
    "pays" : pays,
    "travail" : travail,
    "password" : password
    } 

    db.collection('membres').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Enregistrement avec succès");       
    }); 
        return response.redirect('/'); 
}) 


app.get("/membre/:id", async (request, response) => {     
console.log("Route GET /membre/:id");     
try {         
    let membre = await membreModel.findById(request.params.id).exec();  
    console.log(request.params.id);      
    response.send(membre);     
    }     
catch (error) {  
    response.status(500).send(error);     
    } 
}); 
 

app.put("/membre/:id", async (request, response) => {
    console.log("Route PUT /membre/:id");
    console.log(request.body);
try {
    let membre = await membreModel.findById(request.params.id).exec();
    membre.set(request.body);
    let result = await membre.save();
    response.send(result);
    }
catch (error) {
    response.status(500).send(error);
    }
});


app.delete("/membre/:id", async (request, response) => {   
console.log("Route DELETE /membre/:id");  
try {         
    let result = await membreModel.deleteOne({ _id: request.params.id }).exec();         
    response.send(result); }     
catch (error) { response.status(500).send(error); } });


const entraineurSchema = new mongoose.Schema({  
        username: {
            type: String 
        },    
        prenom: {
            type: String 
        },    
        nom: {
            type: String 
        },   
        entreprise: {
            type: String 
        },    
        telephone: {
            type: String 
        },
        cellulaire: {
            type: String 
        },         
        email: {
            type: String 
        },    
        adresse: {
            type: String 
        },    
        zipCode : {
            type: String
        },
        ville: {
            type: String 
        },
        province: {
            type: String 
        },
        pays: {
            type: String
        },
        travail: {
            type: String 
        },
    
        password: {
            type: String 
        }
    });
    
const entraineurModel = mongoose.model("entraineur", entraineurSchema); 
  
app.post('/entraineur', function(request,response){ 
        let username = request.body.username;
        let prenom = request.body.prenom;
        let nom = request.body.nom;
        let entreprise = request.body.entreprise;
        let telephone = request.body.telephone;
        let cellulaire = request.body.cellulaire;
        let email = request.body.email;
        let adresse = request.body.adresse;
        let zipCode = request.body.zipCode;
        let ville =  request.body.ville;
        let province = request.body.province;
        let pays = request.body.pays;
        let travail = request.body.travail;  
        let password = request.body.password;  
      
        let data = { 
        "username" : username,
        "prenom" : prenom,
        "nom" : nom,
        "entreprise" : entreprise,
        "telephone" : telephone,
        "cellulaire" : cellulaire,
        "email" : email,
        "adresse" : adresse,
        "zipCode" : zipCode,
        "ville" : ville,
        "province" : province,
        "pays" : pays,
        "travail" : travail,
        "password" : password
        } 
    
        db.collection('entraineurs').insertOne(data,function(err, collection){ 
            if (err) throw err; 
            console.log("Enregistrement avec succès");       
        }); 
            return response.redirect('/admin5fb8.html'); 
    }) 
    

app.get("/entraineur/:id", async (request, response) => {     
    console.log("Route GET /entraineur/:id");     
    try {         
        let entraineur = await entraineurModel.findById(request.params.id).exec();  
        console.log(request.params.id);      
        response.send(entraineur);     
        }     
    catch (error) {  
        response.status(500).send(error);     
        } 
    }); 
     
    
app.put("/entraineur/:id", async (request, response) => {
        console.log("Route PUT /entraineur/:id");
        console.log(request.body);
    try {
        let entraineur = await entraineurModel.findById(request.params.id).exec();
        entraineur.set(request.body);
        let result = await entraineur.save();
        response.send(result);
        }
    catch (error) {
        response.status(500).send(error);
        }
    });


app.delete("/entraineur/:id", async (request, response) => {   
    console.log("Route DELETE /entraineur/:id");  
    try {         
        let result = await entraineurModel.deleteOne({ _id: request.params.id }).exec();         
        response.send(result); }     
    catch (error) { response.status(500).send(error); } }); 


const nutritionnisteSchema = new mongoose.Schema({  
        username: {
            type: String 
        },    
        prenom: {
            type: String 
        },    
        nom: {
            type: String 
        },   
        entreprise: {
            type: String 
        },    
        telephone: {
            type: String 
        },
        cellulaire: {
            type: String 
        },         
        email: {
            type: String 
        },    
        adresse: {
            type: String 
        },    
        zipCode : {
            type: String
        },
        ville: {
            type: String 
        },
        province: {
            type: String 
        },
        pays: {
            type: String
        },
        travail: {
            type: String 
        },
    
        password: {
            type: String 
        }
    });
    
const nutritionnisteModel = mongoose.model("nutritionniste", nutritionnisteSchema); 
  
app.post('/nutritionniste', function(request,response){ 
        let username = request.body.username;
        let prenom = request.body.prenom;
        let nom = request.body.nom;
        let entreprise = request.body.entreprise;
        let telephone = request.body.telephone;
        let cellulaire = request.body.cellulaire;
        let email = request.body.email;
        let adresse = request.body.adresse;
        let zipCode = request.body.zipCode;
        let ville =  request.body.ville;
        let province = request.body.province;
        let pays = request.body.pays;
        let travail = request.body.travail;  
        let password = request.body.password;  
      
        let data = { 
        "username" : username,
        "prenom" : prenom,
        "nom" : nom,
        "entreprise" : entreprise,
        "telephone" : telephone,
        "cellulaire" : cellulaire,
        "email" : email,
        "adresse" : adresse,
        "zipCode" : zipCode,
        "ville" : ville,
        "province" : province,
        "pays" : pays,
        "travail" : travail,
        "password" : password
        } 
    
        db.collection('nutritionnistes').insertOne(data,function(err, collection){ 
            if (err) throw err; 
            console.log("Enregistrement avec succès");       
        }); 
            return response.redirect('/admin5fb8.html'); 
    }) 
    

app.get("/nutritionniste/:id", async (request, response) => {     
    console.log("Route GET /nutritionniste/:id");     
    try {         
        let nutritionniste = await nutritionnisteModel.findById(request.params.id).exec();  
        console.log(request.params.id);      
        response.send(nutritionniste);     
        }     
    catch (error) {  
        response.status(500).send(error);     
        } 
    }); 
     
    
app.put("/nutritionniste/:id", async (request, response) => {
        console.log("Route PUT /nutritionniste/:id");
        console.log(request.body);
    try {
        let nutritionniste = await nutritionnisteModel.findById(request.params.id).exec();
        nutritionniste.set(request.body);
        let result = await nutritionniste.save();
        response.send(result);
        }
    catch (error) {
        response.status(500).send(error);
        }
    });

app.delete("/nutritionniste/:id", async (request, response) => {   
    console.log("Route DELETE /nutritionniste/:id");  
    try {         
        let result = await nutritionnisteModel.deleteOne({ _id: request.params.id }).exec();         
        response.send(result); }     
    catch (error) { response.status(500).send(error); } }); 


app.post('/auth', function (req, res, next) { 
      console.log(req.body); 
      console.log("route POST /membre");    
    let username = req.body.username;     
    let password = req.body.password; 
     
    membreModel.findOne({username: username, password: password}, 
        function(err, user) {
           if(err) return next(err);
           if(!user) return res.send("Mauvais nom d'usager ou mot de passe !");
           req.session.loggedin = true; 
           req.session._id = user._id
           req.session.prenom = user.prenom
           req.session.nom = user.nom
           return res.redirect("/home93e8.html");
        });
     });

app.get('/informationMembre', function(req, res) {  
    if (req.session.loggedin) {   
        console.log("Bienvenue , " + req.session.prenom + " " + req.session.nom + " !")
        res.send (
        req.query._id = req.session._id 
        );
    } 
    else { res.send("Pour voir cette page, il faut être connecté");}  
    res.end(); }); 

app.get('/home', function(req, res) {  
        if (req.session.loggedin) {   
            console.log("Bienvenue , " + req.session.prenom + " " + req.session.nom + " !")
            return res.redirect("/home93e8.html")
        } 
        else { 
            return res.redirect("/index.html")
        }
}); 

app.get('/logout', function (req, res) {
        req.session.loggedin = false; 
        res.redirect("/index.html");
    });

app.get('/pageRecettes', function (req, res) {
    return res.redirect("/recettes.html");
});

app.get('/pageExercices', function (req, res) {
    return res.redirect("/exercices.html");
});

const adminSchema = new mongoose.Schema({  
        username: {
            type: String 
        },    
        prenom: {
            type: String 
        },    
        nom: {
            type: String 
        },   
        entreprise: {
            type: String 
        },    
        telephone: {
            type: String 
        },
        cellulaire: {
            type: String 
        },         
        email: {
            type: String 
        },    
        adresse: {
            type: String 
        },    
        zipCode : {
            type: String
        },
        ville: {
            type: String 
        },
        province: {
            type: String 
        },
        pays: {
            type: String
        },
        travail: {
            type: String 
        },
    
        password: {
            type: String 
        }
    });
    
const adminModel = mongoose.model("admin", adminSchema); 
  
app.post('/admin', function(request,response){ 
        let username = request.body.username;
        let prenom = request.body.prenom;
        let nom = request.body.nom;
        let entreprise = request.body.entreprise;
        let telephone = request.body.telephone;
        let cellulaire = request.body.cellulaire;
        let email = request.body.email;
        let adresse = request.body.adresse;
        let zipCode = request.body.zipCode;
        let ville =  request.body.ville;
        let province = request.body.province;
        let pays = request.body.pays;
        let travail = request.body.travail;  
        let password = request.body.password;  
      
        let data = { 
        "username" : username,
        "prenom" : prenom,
        "nom" : nom,
        "entreprise" : entreprise,
        "telephone" : telephone,
        "cellulaire" : cellulaire,
        "email" : email,
        "adresse" : adresse,
        "zipCode" : zipCode,
        "ville" : ville,
        "province" : province,
        "pays" : pays,
        "travail" : travail,
        "password" : password
        } 
    
        db.collection('admins').insertOne(data,function(err, collection){ 
            if (err) throw err; 
            console.log("Enregistrement avec succès");       
        }); 
            return response.redirect('/'); 
    }) 
    

app.get("/admin/:id", async (request, response) => {     
    console.log("Route GET /admin/:id");     
    try {         
        let admin = await adminModel.findById(request.params.id).exec();  
        console.log(request.params.id);      
        response.send(admin);     
        }     
    catch (error) {  
        response.status(500).send(error);     
        } 
    }); 
     
    
app.put("/admin/:id", async (request, response) => {
        console.log("Route PUT /admin/:id");
        console.log(request.body);
    try {
        let admin = await adminModel.findById(request.params.id).exec();
        admin.set(request.body);
        let result = await admin.save();
        response.send(result);
        }
    catch (error) {
        response.status(500).send(error);
        }
    });

app.delete("/admin/:id", async (request, response) => {   
    console.log("Route DELETE /admin/:id");  
    try {         
        let result = await adminModel.deleteOne({ _id: request.params.id }).exec();         
        response.send(result); }     
    catch (error) { response.status(500).send(error); } 
    
}); 
    
    
app.post('/adminAuth', function (req, res, next) { 
    console.log(req.body); 
    console.log("route POST /admin");    
    let username = req.body.username;     
    let password = req.body.password; 
       
    adminModel.findOne({username: username, password: password}, 
        function(err, user) {
            if(err) return next(err);
            if(!user) return res.send("Mauvais nom d'usager ou mot de passe !");
            req.session.loggedin = true; 
            req.session._id = user._id
            req.session.prenom = user.prenom
            req.session.nom = user.nom
            return res.redirect("/admin5fb8.html");
          });
       });
  
app.get('/admin', function(req, res) {  
          if (req.session.loggedin) {   
              console.log("Bienvenue , " + req.session.prenom + " " + req.session.nom + " !")
              res.send (
              req.query._id = req.session._id 
              );
          } 
          else { res.send("Pour voir cette page, il faut être connecté");}  
          res.end(); }); 
  


app.post('/entraineurAuth', function (req, res, next) { 
            console.log(req.body); 
              
            let username = req.body.username;     
            let password = req.body.password; 
               
            entraineurModel.findOne({username: username, password: password}, 
                function(err, user) {
                    if(err) return next(err);
                    if(!user) return res.send("Mauvais nom d'usager ou mot de passe !");
                    req.session.loggedin = true; 
                    req.session._id = user._id
                    req.session.prenom = user.prenom
                    req.session.nom = user.nom
                    return res.redirect("/entraineurd0df.html");
                  });
               });
          
app.get('/entraineur', function(req, res) {  
    if (req.session.loggedin) {   
    console.log("Bienvenue , " + req.session.prenom + " " + req.session.nom + " !")
    res.send (
             req.query._id = req.session._id 
                      );
                  } 
    else { res.send("Pour voir cette page, il faut être connecté");}  
            res.end(); }); 
  
            
            
app.post('/nutrionnisteAuth', function (req, res, next) { 
    console.log(req.body); 
       
    let username = req.body.username;     
    let password = req.body.password; 
                   
    nutritionnisteModel.findOne({username: username, password: password}, 
        function(err, user) {
        if(err) return next(err);
        if(!user) return res.send("Mauvais nom d'usager ou mot de passe !");
                    req.session.loggedin = true; 
                    req.session._id = user._id
                    req.session.prenom = user.prenom
                    req.session.nom = user.nom
                    return res.redirect("/nutritionnisteA798.html");
                });
        });

              
app.get('/nutritionniste', function(req, res) {  
        if (req.session.loggedin) {   
        console.log("Bienvenue , " + req.session.prenom + " " + req.session.nom + " !")
        res.send (
                 req.query._id = req.session._id 
                          );
                      } 
        else { res.send("Pour voir cette page, il faut être connecté");}  
                res.end(); }); 




const specialisteSchema = new mongoose.Schema({  
    username: {
                type: String 
                },    
    prenom: {
                type: String 
                },    
    nom: {
                type: String 
                    },   
    entreprise: {
                type: String 
                    },    
    telephone: {
                type: String 
                    },
    cellulaire: {
                type: String 
                    },         
    email: {
                type: String 
                    },    
    adresse: {
                type: String 
                    },    
    zipCode : {
                type: String
                    },
    ville: {
                type: String 
                    },
    province: {
                type: String 
                    },
    pays: {
                type: String
                    },
    travail: {
                type: String 
                    },
                
    password: {
                type: String 
                    }
                });
                
    const specialisteModel = mongoose.model("specialiste", specialisteSchema); 
              
        app.post('/specialiste', function(request,response){ 
                    let username = request.body.username;
                    let prenom = request.body.prenom;
                    let nom = request.body.nom;
                    let entreprise = request.body.entreprise;
                    let telephone = request.body.telephone;
                    let cellulaire = request.body.cellulaire;
                    let email = request.body.email;
                    let adresse = request.body.adresse;
                    let zipCode = request.body.zipCode;
                    let ville =  request.body.ville;
                    let province = request.body.province;
                    let pays = request.body.pays;
                    let travail = request.body.travail;  
                    let password = request.body.password;  
                  
                    let data = { 
                    "username" : username,
                    "prenom" : prenom,
                    "nom" : nom,
                    "entreprise" : entreprise,
                    "telephone" : telephone,
                    "cellulaire" : cellulaire,
                    "email" : email,
                    "adresse" : adresse,
                    "zipCode" : zipCode,
                    "ville" : ville,
                    "province" : province,
                    "pays" : pays,
                    "travail" : travail,
                    "password" : password
                    } 
                
                    db.collection('specialistes').insertOne(data,function(err, collection){ 
                        if (err) throw err; 
                        console.log("Enregistrement avec succès");       
                    }); 
                        return response.redirect('/ProfilAVerifier.html'); 
            }) 


const exerciceSchema = new mongoose.Schema({ 
        categorie: {
            type: String 
        },    
        nom: {
            type: String, 
        },   
        description: {
            type: String 
        },     
        cheminImage: {
            type: String 
        },    
        repetitions: {
            type: Number, 
        },   
        series: {
            type: Number 
        },     
        pauses: {
            type: Number 
        },    
    });
    
const exerciceModel = mongoose.model("exercice", exerciceSchema); 
    
    // Ajouter un enregistrement dans la DB (CREATE)
    app.post('/exercice', function(request,response){ 
        let categorie = request.body.categorie;
        let nom = request.body.nom;
        let description = request.body.description;
        let cheminImage = request.body.cheminImage;
        let repetitions = request.body.repetitions;
        let series = request.body.series;
        let pauses = request.body.pauses;
      
        let data = { 
        "categorie" : categorie,
        "nom" : nom,
        "description" : description,
        "cheminImage" : cheminImage,
        "repetitions" : repetitions,
        "series" :  series,
        "pauses" : pauses
        } 
    
    db.collection('exercices').insertOne(data,function(err, collection){ 
            if (err) throw err; 
            console.log("Enregistrement avec succès");       
        }); 
            return response.redirect("/entraineurd0df.html"); 
    }) 
    
    // Obtenir la liste des enregistrement contenu dans la DB (READ) 
    app.get('/exercices', async (request, response) => {
        console.log("Route GET /exercices");
        try {
             let result = await exerciceModel.find().exec();  
                response.send(result);
                     } 
        catch (error) {
                response.status(500).send(error);
                    }
            });           
    
    // Obtenir un enregistrement en particulier dans la DB (READ) 
    app.get("/exercice/:id", async (request, response) => {     
        console.log("Route GET /exercice/:id");     
        try {         
            let person = await exerciceModel.findById(request.params.id).exec();  
            console.log(request.params.id);      
            response.send(person);     
            }     
        catch (error) {  
            response.status(500).send(error);     
            } 
        }); 
     
    
    app.put("/exercice/:id", async (request, response) => {
            console.log("Route PUT /exercice/:id");
            console.log(request.body);
        try {
            let person = await exerciceModel.findById(request.params.id).exec();
            person.set(request.body);
            let result = await person.save();
            response.send(result);
            }
        catch (error) {
            response.status(500).send(error);
            }
        });
    
    // Effacer un enregistrement (EFFACER) 
    app.delete("/exercice/:id", async (request, response) => {   
        console.log("Route DELETE /exercice/:id");  
        try {         
            let result = await exerciceModel.deleteOne({ _id: request.params.id }).exec();         
            response.send(result); }     
        catch (error) { response.status(500).send(error); } });

    
    
    const recetteSchema = new mongoose.Schema({ 

            categorie: {
                type: String 
            },    
            nom: {
                type: String, 
            },   
            instructions: {
                type: String 
            },     
            cheminImage: {
                type: String 
            },    
            ingredients: {
                type: String, 
            },   
            portions: {
                type: String 
            },     
            cuisson: {
                type: Number 
            },    
        });
        
    const recetteModel = mongoose.model("recette", recetteSchema); 
        
        // Ajouter un enregistrement dans la DB (CREATE)
        app.post('/recette', function(request,response){ 
            let categorie = request.body.categorie;
            let nom = request.body.nom;
            let instructions = request.body.instructions;
            let cheminImage = request.body.cheminImage;
            let ingredients = request.body.ingredients;
            let portions = request.body.portions;
            let cuisson = request.body.cuisson;
          
            let data = { 
            "categorie" : categorie,
            "nom" : nom,
            "instructions" : instructions,
            "cheminImage" : cheminImage,
            "ingredients" : ingredients,
            "portions" :  portions,
            "cuisson" : cuisson
            } 
        
        db.collection('recettes').insertOne(data,function(err, collection){ 
                if (err) throw err; 
                console.log("Enregistrement avec succès");       
            }); 
                return response.redirect('/nutritionnisteA798.html'); 
        }) 
        
        // Obtenir la liste des enregistrement contenu dans la DB (READ) 
        app.get('/recettes', async (request, response) => {
            console.log("Route GET /recettes");
            try {
                 let result = await recetteModel.find().exec();  
                    response.send(result);
                         } 
            catch (error) {
                    response.status(500).send(error);
                        }
                });           
        
        // Obtenir un enregistrement en particulier dans la DB (READ) 
        app.get("/recette/:id", async (request, response) => {     
            console.log("Route GET /recette/:id");     
            try {         
                let person = await recetteModel.findById(request.params.id).exec();  
                console.log(request.params.id);      
                response.send(person);     
                }     
            catch (error) {  
                response.status(500).send(error);     
                } 
            }); 
         
        
        app.put("/recette/:id", async (request, response) => {
                console.log("Route PUT /recette/:id");
                console.log(request.body);
            try {
                let person = await recetteModel.findById(request.params.id).exec();
                person.set(request.body);
                let result = await person.save();
                response.send(result);
                }
            catch (error) {
                response.status(500).send(error);
                }
            });
        
        // Effacer un enregistrement (EFFACER) 
        app.delete("/recette/:id", async (request, response) => {   
            console.log("Route DELETE /recette/:id");  
            try {         
                let result = await recetteModel.deleteOne({ _id: request.params.id }).exec();         
                response.send(result); }     
            catch (error) { response.status(500).send(error); } });  

app.listen(port, () => { console.log(`Serveur en écoute sur le port ${port}...`); });
