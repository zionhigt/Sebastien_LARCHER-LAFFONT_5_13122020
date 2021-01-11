import * as productsList from "./modules/mainProductList.js";
import * as btnCartEvent from "./modules/eventCartBtn.js";
import * as multi from "./modules/multi.js";

window.addEventListener("DOMContentLoaded", function(e){
	// When Dom is loaded
	document.addEventListener("dataisready", function(){
		// Be listening for dataisready event
		productsList.buildCardsDeck();
		// Be building cards of products

	});

	multi.multiStepHandeler();
	// Be initialising for multi step windows event listener 
	btnCartEvent.initMovedBtnEvent();
	// Be initialising for cart's button event listener 

});









// afficher les produits
	// liste des produits
// selectionner les produits
	// Afficher dans une fenetre modal le produit selectioné
// personaliser les produits
	// choisir une modification, par default première de la liste. 
// ajouter au panier
	// envoye le produits dans le panier.
	// Afficher une alerte indiquant que le produit est dans le panier.
	// Afficher une alerte indiquant que le produit s'y trouve déja.
	// renvoyer l'utilisateur à la liste des produits.
// commander
	// dans le panier avec au moin 1 produits
		// confirmer le formulaire
		// résumer la commande
		// si le formualaire et correctement rempli
			//validation
				// remerciments
				// vider le panier
				// retour a l'acceuil

