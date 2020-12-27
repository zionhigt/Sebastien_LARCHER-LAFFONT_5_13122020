import * as echo from "./modules/echo.js";
import {building} from "./modules/buildWord.js";
import * as data from "./modules/getProductData.js";
import * as productsList from "./modules/mainProductList.js";

document.querySelector('body').addEventListener("dataisready", function(){

	document.querySelector("#camerasView").appendChild(productsList.buildCardsDeck(data.data));
})


// afficher les produits
	// liste des produits
// selectionner les produits
	// Afficher dans une fenetre modal le produit selectioné
// personaliser les produits
	// choisir une modification, par default première de la liste. 
// ajouter au panier
	// envoye le produits dans le panier.
	// propose d'augmenter la quantité si le produit s'y trouve déja.
	// Afficher une alerte indiquant que le produits est dans le panier.
	// renvoyer l'utilisateur à la liste des produits.
// commander
	// dans le panier avec au moin 1 produits
		// résumer la commande
		// confirmer et passer au formulaire
		// si le formualaire et correctement rempli
			//validation
				// remerciments
				// vider le panier
				// retour a l'acceuil

