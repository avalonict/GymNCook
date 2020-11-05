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
            return response.redirect('/ProfilAVerifier.html'); 
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
            return response.redirect('/ProfilAVerifier.html'); 
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
           return res.redirect("/home.html");
        });
     });

     
app.get('/home', function(req, res) {  
        if (req.session.loggedin) {   
            console.log("Bienvenue , " + req.session.prenom + " " + req.session.nom + " !")
            res.send (
            req.query._id = req.session._id 
            );
        } 
        else { res.send("Pour voir cette page, il faut être connecté");}  
        res.end(); }); 

app.get('/logout', function (req, res) {
        req.session.loggedin = false; 
        res.redirect("/index.html");
    });

    

const produitSchema = new mongoose.Schema({  
        categorie: {
            type: String 
        },
        noArticle: {
            type: Number, 
        },   
        nomArticle: {
            type: String 
        },     
        description: {
            type: String 
        },     
        cheminImage: {
            type: String 
        },    
        prixUnitaire: {
            type: Number, 
        },   
        quantiteEnStock: {
            type: Number 
        },     
        quantiteDansPanier: {
            type: Number 
        },    
       
    });
    
    const ProduitModel = mongoose.model("Produit", produitSchema); 
    
    app.post('/produit', function(request,response){ 
        let categorie = request.body.categorie;
        let noArticle = request.body.noArticle;
        let nomArticle = request.body.nomArticle;
        let description = request.body.description;
        let cheminImage = request.body.cheminImage;
        let prixUnitaire = request.body.prixUnitaire;
        let quantiteEnStock = request.body.quantiteEnStock;
        let quantiteDansPanier = request.body.quantiteDansPanier;
        
        let data = { 
        "categorie" : categorie,
        "noArticle" : noArticle,
        "nomArticle" : nomArticle,
        "description" : description,
        "cheminImage" : cheminImage,
        "prixUnitaire" : prixUnitaire,
        "quantiteEnStock" :  quantiteEnStock,
        "quantiteDansPanier" : quantiteDansPanier
        
        } 
    
    db.collection('produits').insertOne(data,function(err, collection){ 
            if (err) throw err; 
            console.log("Enregistrement avec succès");       
        }); 
            return response.redirect('/'); 
    }) 
    
     
    app.get('/produits', async (request, response) => {
        console.log("Route GET /produits");
        try {
             let result = await ProduitModel.find().exec();  
                response.send(result);
                     } 
        catch (error) {
                response.status(500).send(error);
                    }
            });           
    
    
    app.get("/produit/:id", async (request, response) => {     
        console.log("Route GET /produit/:id");     
        try {         
            let produit = await ProduitModel.findById(request.params.id).exec();  
            console.log(request.params.id);      
            response.send(produit);     
            }     
        catch (error) {  
            response.status(500).send(error);     
            } 
        }); 
     
    
    app.put("/produit/:id", async (request, response) => {
            console.log("Route PUT /produit/:id");
            console.log(request.body);
        try {
            let produit = await ProduitModel.findById(request.params.id).exec();
            produit.set(request.body);
            let result = await produit.save();
            response.send(result);
            }
        catch (error) {
            response.status(500).send(error);
            }
        });
    
    
    app.delete("/produit/:id", async (request, response) => {   
        console.log("Route DELETE /produit/:id");  
        try {         
            let result = await ProduitModel.deleteOne({ _id: request.params.id }).exec();         
            response.send(result); }     
        catch (error) { response.status(500).send(error); } }); 

app.listen(port, () => { console.log(`Serveur en écoute sur le port ${port}...`); });