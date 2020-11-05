window.onload = function(){
    loadJSON('http://localhost:4200/produits')
  }
  
function loadJSON(url){
    fetch(url) 
    .then(reponse => reponse.json());
  }
  
function recettes(url) { 
    fetch(url) 
    .then(function(reponse){ 
    return reponse.text();  }) 
    .then(function(html){ 

  document.getElementById("voirHtml").innerHTML = html; }); }

  
function exercices(url) { 
  fetch(url) 
  .then(function(reponse){ 
  return reponse.text();  }) 
  .then(function(html){  

document.getElementById("voirHtml").innerHTML = html; }); }

function Politique(url) { 
  fetch(url) 
  .then(function(reponse){ 
  return reponse.text();  }) 
  .then(function(html){  

document.getElementById("voirHtml").innerHTML = html; }); }

function Termes(url) { 
  fetch(url) 
  .then(function(reponse){ 
  return reponse.text();  }) 
  .then(function(html){  

document.getElementById("voirHtml").innerHTML = html; }); }


function choixInscription(url) { 
  fetch(url) 
  .then(function(reponse){ 
  return reponse.text();  }) 
  .then(function(html){  

document.getElementById("voirHtml").innerHTML = html; }); }


function userInscription() {
  if (document.getElementById("liste").value == 'utilisateur') {
    inscriptionUsager('/html/userInscription.html');
  } 

  else if (document.getElementById("liste").value == 'nutritionniste') {
    nutritionistRegistration('/html/nutritionnisteInscription.html');
  } 
  
  else {
    coachRegistration('/html/entraineurInscription.html');
  }
}

function effacer() {
  document.getElementById("affichage").value = "";
}

  function inscriptionUsager(url) { 
    fetch(url) 
    .then(function(reponse){ 
    return reponse.text();  }) 
    .then(function(inscription){  
    document.getElementById("voirHtml").innerHTML = inscription; }); }


  function nutritionistRegistration(url) { 
    fetch(url) 
    .then(function(reponse){ 
     return reponse.text();  }) 
    .then(function(inscription){  
    document.getElementById("voirHtml").innerHTML = inscription; }); }

  function coachRegistration(url) { 
    fetch(url) 
    .then(function(reponse){ 
     return reponse.text();  }) 
    .then(function(inscription){  
    document.getElementById("voirHtml").innerHTML = inscription; }); }
  

  function connexion(url) { 
      fetch(url) 
      .then(function(reponse){ 
      return reponse.text();  }) 
      .then(function(compte){  
      document.getElementById("voirHtml").innerHTML = compte; }); }


  fetch(`http://localhost:4200/home`, {
        method: 'GET'
    })
  .then(reponse => reponse.text())
  .then(id =>  {
  
   fetch(`http://localhost:4200/membre/` + id) 
  .then(reponse => reponse.json())
  .then(objJSON =>  {
     
    document.getElementById("membreConnecte").innerHTML = objJSON.username;
       
  });
});
   

function rechercher(){
  const url = 'http://localhost:4200/produits';
  fetch(url)
    .then(reponse => reponse.json())
    .then(data => {
      let categorie = "";
        
        for (let i = 0; i < data.length; i++){
          categorie += data[i].categorie + " " ;
          }
         
          let jeCherche = document.getElementById("jeCherche").value;
          let produitTrouve = "";
          for (let i = 0; i < data.length; i++){

            if (jeCherche.toLowerCase() !== data[i].categorie.toLowerCase()){
              produitTrouve = "Pas de catégorie";
            }        

              if(jeCherche.toLowerCase() == "recettes" || jeCherche.toLowerCase() == "recettes"){
                recettes('/html/recettes.html')
                produitTrouve = jeCherche;
              }
              
              if(jeCherche.toLowerCase() == "exercices" || jeCherche.toLowerCase() == "exercices"){
                exercices('/html/exercices.html')
                produitTrouve = jeCherche;
              }  
            }
          document.getElementById("produitTrouve").innerHTML = produitTrouve;
      });
    }

      
function profilMembre(url) { 
        fetch(url) 
        .then(function(reponse){ 
        return reponse.text();  }) 
        .then(function(profil){  
    
        fetch(`http://localhost:4200/home`, {
            method: 'GET'
        })
      .then(reponse => reponse.text())
      .then(id =>  {
      
       fetch(`http://localhost:4200/membre/` + id) 
      .then(reponse => reponse.json())
      .then(objJSON =>  {
         
           document.getElementById("id").value = objJSON._id ;
           document.getElementById("username").value = objJSON.username ;
           document.getElementById("nom").value = objJSON.nom ;
           document.getElementById("prenom").value = objJSON.prenom ;
           document.getElementById("entreprise").value = objJSON.entreprise ;
           document.getElementById("telephone").value = objJSON.telephone ;
           document.getElementById("cellulaire").value = objJSON.cellulaire ;
           document.getElementById("email").value = objJSON.email ;
           document.getElementById("adresse").value = objJSON.adresse ;
           document.getElementById("zipCode").value = objJSON.zipCode ;
           document.getElementById("ville").value = objJSON.ville ;
           document.getElementById("province").value = objJSON.province ;
           document.getElementById("pays").value = objJSON.pays ;
           document.getElementById("travail").value =  objJSON.travail ;
           document.getElementById("password").value = objJSON.password ;
      });
    });
      document.getElementById("voirHtml").innerHTML = profil; });}


function modifierUnMembre(id) {
           let jsonOut = JSON.stringify
           ({
             "id" : document.getElementById("id").value,
             "username" :document.getElementById("username").value ,
             "nom" : document.getElementById("nom").value,
             "prenom" :document.getElementById("prenom").value,
             "entreprise" :document.getElementById("entreprise").value ,
             "telephone" : document.getElementById("telephone").value,
             "cellulaire" : document.getElementById("cellulaire").value,
             "email" : document.getElementById("email").value,
             "adresse" : document.getElementById("adresse").value ,
             "zipCode"  : document.getElementById("zipCode").value,
             "ville" : document.getElementById("ville").value,
             "province" : document.getElementById("province").value ,
             "pays"  : document.getElementById("pays").value,
             "travail" : document.getElementById("travail").value,
             "password" : document.getElementById("password").value
           }); 
         
             fetch(`http://localhost:4200/membre/${id}`, {
                 method: 'PUT',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: jsonOut
             });
            }
                

function supprimerUnMembre(id){ 
      let response = confirm("Êtes-vous sûr de vouloir supprimer votre compte?");
        if(response){
          const options = {
          method: 'DELETE',
          headers: {
                  'Content-Type': 'application/json'
                  }
              }
        fetch(`http://localhost:4200/membre/${id}`, options)
              .then(res => {
                if (res.ok) {
                    return Promise.resolve('Contact supprimé.');
                          
                  } else {
                          return Promise.reject('Une erreur survenue.');
                      }
                  })
                  .then(res => console.log(res));
              }
    }