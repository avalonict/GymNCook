//===========================================
// Sur la page d'acceuil de l'application
// lorsqu'on appuie sur les fleches de 
// la barre de navigation, l'option de 
// navigation changes (recettes ou exercices).
//============================================
function changeCibleNavigation() {

    if( document.getElementById("navigationRecettesPub")) {
        document.getElementById("navigationAcceuil").innerHTML = "<a id=\"navigationExercicesPub\" href=\"/pageExercices\"><p>Parcourir nos exercices</p></a>";
    }else {
        document.getElementById("navigationAcceuil").innerHTML = "<a id=\"navigationRecettesPub\" href=\"/pageRecettes\"><p>Parcourir nos recettes</p></a>";
    }
    
}

//===========================================
// Class Recette
//============================================
class Recette {
    id;
    nom;
}

//===========================================
// Lorsque la page de recette s'ouvre on va
// chercher la liste des recettes contenues
// dans la base de donnees. Cette liste se 
// nomme listeRecettes
//============================================
let listeRecettes = Array();

async function recupererRecettes(){
    fetch('/recettes')
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            for(i = 0; i < data.length; i++){
                let recette = new Recette();
                recette.id = data[i]._id
                recette.nom = data[i].nom

                listeRecettes.push(recette)
            }
        
            listerRecettes(listeRecettes);
        })
}

//===========================================
// Affiches les cartes des recette selon une 
// liste d'objets recettes qu'on lui fournis.
// Mettre le html dans un document a part ?
//============================================
function listerRecettes(liste) {
    document.getElementById("divListeRecette").innerHTML = "";
    for(i = 0; i < liste.length; i++) {
        document.getElementById("divListeRecette").innerHTML = "<div class=\"carteListe\" id = \"" + liste[i].id + "\" onclick=\"afficherDetailRecette(this.id)\"><img class=\"iconImage\" src= \"/img/recette.jpg\"><div class=\"nomDetailRecette\"><p>" + liste[i].nom + "<p><div class=\"detailRecette\"><p>portions</p><p>prix</p><p>temps</p></div></div></div>"
    }
}

//===========================================
// Affiches le detail de la recette selectionnee.
// Mettre le html dans un document a part ?
//============================================
function afficherDetailRecette(id) {
    for(i = 0; i < listeRecettes.length; i++) {
        if(id == (listeRecettes[i].id)) {
            document.getElementById("bodyRecette").innerHTML = "<div class=\"divConnexion\"><div class=\"carteRecette\"><div class=\"boiteDeroulante\"><div class=\"headerRecette\"><img class=\"iconImage\" src= \"img/recette.jpg\"><div class=\"divFlexColumn\"><h1>" + listeRecettes[i].nom + "</h1><div><h3>Portions</h3> <h3>Temps</h3><h3>Calorie</h3></div></div></div><div class=\"bodyRecette\"><h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam consequatur officiis repellat corrupti dolorum, ipsa possimus. Incidunt mollitia perferendis, molestiae non expedita explicabo dolorem unde, aliquid doloremque dolores laudantium? Cupiditate? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint id maxime architecto at accusamus debitis dignissimos, numquam est eum consectetur eius iusto quibusdam modi! Iure tenetur ea commodi tempora animi! <br> <br> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam consequuntur, illum quaerat fugiat doloremque porro impedit dolor, voluptas aliquam molestias ut possimus animi quae. Aliquam rem harum ullam laudantium inventore.</h3></div></div></div></div><div class=\"divNavigation\"><a id=\"navigationRecettesPub\" href=\"/pageRecettes\"><p id=\"navigationRecettesPub\">Retour</p></div></a>"
        }
    }
}

//===========================================
// Dans la barre de recherche dans les pages
// recettes et exercices, la fonction recherche
// se lance quand on entre un caractere dans 
// la barre de recherche.
//============================================
function rechercherSelection() {
    var selectionRechercher = (document.getElementById("texteUtilisateurRecherche").value).toLowerCase();
    var listeRecettesRechercher = Array();

    for(i = 0; i < listeRecettes.length; i++) {
        if(((listeRecettes[i].nom).toLowerCase()).indexOf(selectionRechercher) != -1) {
            listeRecettesRechercher.push(listeRecettes[i]);
        }
    }
    listerRecettes(listeRecettesRechercher);
}
