window.onload = function(){
    loadJSON('http://localhost:4200/exercices')
    loadJSON('http://localhost:4200/recettes')
  }
  
function loadJSON(url){
    fetch(url) 
    .then(reponse => reponse.json());
  }

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

function recettes(url) { 
    fetch(url) 
    .then(function(reponse){ 
    return reponse.text();  }) 
    .then(function(html){ 

      fetch(`http://localhost:4200/recette/5fa448c8b53e4f3148c20ef5`) 
      .then(reponse => reponse.json())
      .then(data =>  affImage(data));
      
      function affImage(objJSON){
      let image = "";
      image += "<p >" + 
      '<img src="' + objJSON.cheminImage + '">'  + "</p>" ;
      document.getElementById("image").innerHTML = image;
      
      }

  document.getElementById("voirHtml").innerHTML = html; }); }

  
function exercices(url) { 
  fetch(url) 
  .then(function(reponse){ 
  return reponse.text();  }) 
  .then(function(html){  
    
    fetch(`http://localhost:4200/exercice/5fa36c71e6d38031c019944d`) 
    .then(reponse => reponse.json())
    .then(data =>  affImage(data));
    
    function affImage(objJSON){
    let image = "";
    image += "<p >" + 
    '<img src="' + objJSON.cheminImage + '">'  + "</p>" ;
    document.getElementById("image").innerHTML = image;
    
    }
   document.getElementById("voirHtml").innerHTML = html; }); }

   


function choixInscription(url) { 
  fetch(url) 
  .then(function(reponse){ 
  return reponse.text();  }) 
  .then(function(html){  
document.getElementById("voirHtml").innerHTML = html; }); 
}


function choixConnexion(url) { 
  fetch(url) 
  .then(function(reponse){ 
  return reponse.text();  })
  .then(function(html){  
document.getElementById("voirHtml").innerHTML = html; }); 
}


function choixCRUD(url) { 
  fetch(url) 
  .then(function(reponse){ 
  return reponse.text();  }) 
  .then(function(html){  
document.getElementById("voirHtml").innerHTML = html; }); }


function userInscription() {
    inscriptionUsager('/html/userInscription.html');
}

function inscriptionUsager(url) { 
  fetch(url) 
  .then(function(reponse){ 
  return reponse.text();  }) 
  .then(function(inscription){  
  document.getElementById("voirHtml").innerHTML = inscription; }); }


function userConnexion() {
    connexion('/html/loginUsager.html');
}

function adminCRUD() {
  if (document.getElementById("liste").value == 'exercice') {
    choixCRUD('/html/formPostExercice.html');
  } 

  else if (document.getElementById("liste").value == 'recette') {
    choixCRUD('/html/formPostRecette.html');
  } 

  else if (document.getElementById("liste").value == 'nutritionniste') {
    inscriptionUsager('/html/nutritionistForm.html');
  } 

  else if (document.getElementById("liste").value == 'entraineur') {
    choixCRUD('/html/coachForm.html');
  } 
  
  else {
    choixCRUD('/html/userInscription.html');
  }
}

function effacer() {
  document.getElementById("affichage").value = "";
}


function adminConnexion(url) { 
      fetch(url) 
      .then(function(reponse){ 
      return reponse.text();  }) 
      .then(function(compte){  
      document.getElementById("voirHtml").innerHTML = compte; }); }

      fetch(`http://localhost:4200/admin`, {
        method: 'GET'
    })
      .then(reponse => reponse.text())
      .then(id =>  {
  
      fetch(`http://localhost:4200/admin/` + id) 
     .then(reponse => reponse.json())
      .then(objJSON =>  {
     
    document.getElementById("adminConnecte").innerHTML = objJSON.username;
       
    });
  });
  
  function nutritionnisteConnexion(url) { 
    fetch(url) 
    .then(function(reponse){ 
    return reponse.text();  }) 
    .then(function(compte){  
    document.getElementById("voirHtml").innerHTML = compte; }); }

    fetch(`http://localhost:4200/nutritionniste`, {
      method: 'GET'
  })
    .then(reponse => reponse.text())
    .then(id =>  {

    fetch(`http://localhost:4200/nutritionniste/` + id) 
   .then(reponse => reponse.json())
    .then(objJSON =>  {
   
  document.getElementById("nutritionnisteConnecte").innerHTML = objJSON.username;
     
  });
});


function entraineurConnexion(url) { 
  fetch(url) 
  .then(function(reponse){ 
  return reponse.text();  }) 
  .then(function(compte){  
  document.getElementById("voirHtml").innerHTML = compte; }); }

  fetch(`http://localhost:4200/entraineur`, {
    method: 'GET'
})
  .then(reponse => reponse.text())
  .then(id =>  {

  fetch(`http://localhost:4200/entraineur/` + id) 
 .then(reponse => reponse.json())
  .then(objJSON =>  {
 
document.getElementById("entraineurConnecte").innerHTML = objJSON.username;
   
});
});

function connexion(url) { 
      fetch(url) 
      .then(function(reponse){ 
      return reponse.text();  }) 
      .then(function(compte){  
      document.getElementById("voirHtml").innerHTML = compte; }); }


  fetch(`http://localhost:4200/informationMembre`, {
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
  const url = 'http://localhost:4200/exercices';
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
    
        fetch(`http://localhost:4200/informationMembre`, {
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


  function profilAdmin(url) { 
      fetch(url) 
      .then(function(reponse){ 
      return reponse.text();  }) 
      .then(function(profil){  
  
      fetch(`http://localhost:4200/admin`, {
          method: 'GET'
      })
    .then(reponse => reponse.text())
    .then(id =>  {
    
     fetch(`http://localhost:4200/admin/` + id) 
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


function modifierUnAdmin(id) {
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
       
           fetch(`http://localhost:4200/admin/${id}`, {
               method: 'PUT',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: jsonOut
           });
          }
              

function supprimerUnAdmin(id){ 
    let response = confirm("Êtes-vous sûr de vouloir supprimer votre compte?");
      if(response){
        const options = {
        method: 'DELETE',
        headers: {
                'Content-Type': 'application/json'
                }
            }
      fetch(`http://localhost:4200/admin/${id}`, options)
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


  function profilEntraineur(url) { 
      fetch(url) 
      .then(function(reponse){ 
      return reponse.text();  }) 
      .then(function(profil){  
  
      fetch(`http://localhost:4200/entraineur`, {
          method: 'GET'
      })
    .then(reponse => reponse.text())
    .then(id =>  {
    
     fetch(`http://localhost:4200/entraineur/` + id) 
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


function modifierUnEntraineur(id) {
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
       
           fetch(`http://localhost:4200/entraineur/${id}`, {
               method: 'PUT',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: jsonOut
           });
          }
              

function supprimerUnEntraineur(id){ 
    let response = confirm("Êtes-vous sûr de vouloir supprimer votre compte?");
      if(response){
        const options = {
        method: 'DELETE',
        headers: {
                'Content-Type': 'application/json'
                }
            }
      fetch(`http://localhost:4200/entraineur/${id}`, options)
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


  function profilNutritionniste(url) { 
    fetch(url) 
    .then(function(reponse){ 
    return reponse.text();  }) 
    .then(function(profil){  

    fetch(`http://localhost:4200/nutritionniste`, {
        method: 'GET'
    })
  .then(reponse => reponse.text())
  .then(id =>  {
  
   fetch(`http://localhost:4200/nutritionniste/` + id) 
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


function modifierUnNutritionniste(id) {
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
     
         fetch(`http://localhost:4200/nutritionniste/${id}`, {
             method: 'PUT',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: jsonOut
         });
        }
            

      function supprimerUnNutritionniste(id){ 
          let response = confirm("Êtes-vous sûr de vouloir supprimer votre compte?");
            if(response){
              const options = {
              method: 'DELETE',
              headers: {
                      'Content-Type': 'application/json'
                      }
                  }
            fetch(`http://localhost:4200/nutritionniste/${id}`, options)
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


function formPutExercice(id) { 

    let url = `http://localhost:4200/exercice/${id}`;
    
      fetch(url) 
      .then(reponse => reponse.json())
      .then(data =>  afficheForme(data,id));}
    
function afficheForme(objJSON,_id){

  fetch(`http://localhost:4200/html/formPutExercice.html`) 
  
  .then(function(reponse){ 
  return reponse.text();  }) 
  .then(function(formHtml){  
  document.getElementById("pageHtml").innerHTML = formHtml; 

  document.getElementById("id").value = objJSON._id ;
  document.getElementById("nom").value = objJSON.nom ;
  document.getElementById("categorie").value = objJSON.categorie ;
  document.getElementById("cheminImage").value = objJSON.cheminImage ;
  document.getElementById("description").value = objJSON.description ;
  document.getElementById("repetitions").value = objJSON.repetitions ;
  document.getElementById("series").value = objJSON.series ;
  document.getElementById("pauses").value = objJSON.pauses ;
 
  }); }

function effaceUneExercices(id){ 
  let response = confirm("Êtes-vous sûr de vouloir supprimer ce exercice?");
    if(response){
      const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
    }
}
fetch(`http://localhost:4200/exercice/${id}`, options)
    .then(res => {
        if (res.ok) {
            return Promise.resolve('exercice supprimé.');
            
        } else {
            return Promise.reject('Une erreur survenue.');
        }
    })
    .then(res => console.log(res));
  }
}

  function modifierUnExercice(id){ 
    
    let jsonOut = JSON.stringify

  ({
    
    "id" : document.getElementById("id").value,
    "nom" : document.getElementById("nom").value,
    "categorie" :document.getElementById("categorie").value,
    "cheminImage" :document.getElementById("cheminImage").value ,
    "description" : document.getElementById("description").value,
    "repetition" : document.getElementById("repetition").value,
    "series" : document.getElementById("series").value ,
    "pauses" : document.getElementById("pauses").value
  
  }); 

    fetch(`http://localhost:4200/exercice/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonOut
    });
  }

  function formPostExercice(url) { 
    fetch(url) 
    .then(function(reponse){ 
    return reponse.text();  }) 
    .then(function(html){  
    document.getElementById("voirHtml").innerHTML = html; }); }



  function formPostRecette(url) { 
      fetch(url) 
      .then(function(reponse){ 
      return reponse.text();  }) 
      .then(function(html){  
      document.getElementById("voirHtml").innerHTML = html; }); }
  
  
    function formPutRecette(id) { 

      let url = `http://localhost:4200/recette/${id}`;
      
        fetch(url) 
        .then(reponse => reponse.json())
        .then(data =>  afficheForme(data,id));}
      
  function afficheForme(objJSON,_id){
  
    fetch(`http://localhost:4200/html/formPutRecette.html`) 
    
    .then(function(reponse){ 
    return reponse.text();  }) 
    .then(function(formHtml){  
    document.getElementById("pageHtml").innerHTML = formHtml; 
  
    document.getElementById("id").value = objJSON._id ;
    document.getElementById("nom").value = objJSON.nom ;
    document.getElementById("categorie").value = objJSON.categorie ;
    document.getElementById("cheminImage").value = objJSON.cheminImage ;
    document.getElementById("instructions").value = objJSON.instructions ;
    document.getElementById("ingredients").value = objJSON.ingredients ;
    document.getElementById("portions").value = objJSON.portions ;
    document.getElementById("cuisson").value = objJSON.cuisson ;
   
    }); }
  

  function effaceUnerecettes(id){ 
    let response = confirm("Êtes-vous sûr de vouloir supprimer ce recette?");
      if(response){
        const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
      }
  }
  fetch(`http://localhost:4200/recette/${id}`, options)
      .then(res => {
          if (res.ok) {
              return Promise.resolve('recette supprimé.');
              
          } else {
              return Promise.reject('Une erreur survenue.');
          }
      })
      .then(res => console.log(res));
    }
  }
  
    function modifierUnrecette(id){ 
      
      let jsonOut = JSON.stringify
  
    ({
      
      "id" : document.getElementById("id").value,
      "nom" : document.getElementById("nom").value,
      "categorie" :document.getElementById("categorie").value,
      "cheminImage" :document.getElementById("cheminImage").value ,
      "instructions" : document.getElementById("instructions").value,
      "ingredients" : document.getElementById("ingredients").value,
      "portions" : document.getElementById("portions").value ,
      "cuisson" : document.getElementById("cuisson").value
    
    }); 
  
      fetch(`http://localhost:4200/recette/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: jsonOut
      });
  
    }
