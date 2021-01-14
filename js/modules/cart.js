import * as alert from "./alert.js";
import * as Cv from "./cv.js";
import * as data from "./getProductData.js";
import * as available from "./detectLocalStorage.js";



export let articlesIntoCart = [];//Liste des articles dans le panier
export let countItems = [];//Liste des sous totaux
export let totalArticles = [];//Liste des quantité par article 
export let cartTotal = 0;

let storageAvailable = available.storageAvailable('localStorage') ? true : false;

export function initCart()
{
	if(storageAvailable)
	{
		document.querySelector('body').appendChild(alert.popAlertActionCart("cookies", "", 0));
		
		if(localStorage.getItem("orinoco_cameras_totalArticle") != null)
		{

			totalArticles = JSON.parse(localStorage.getItem("orinoco_cameras_totalArticle"));
		}

		for(let i in localStorage)
		{

			if(data.isIdOfProduct(i) == true)
			{
				let article = JSON.parse(localStorage.getItem(i));
				addArticleIntoCart(article, 0, 0);
			}
		}
		updateLocalStorage();
	}
}


function updateLocalStorage()
{
	if(storageAvailable)
	{
		let idsInCart = articlesIntoCart.map(function(p){return p._id});

		for(let i in localStorage)
		{
			let storageCurrentId = i;
			// si la clé du localStorage fait référence à un produit de la gamme
			// Suprimer le produits du localStorage.
			if(data.isIdOfProduct(storageCurrentId) == true)
			{
				localStorage.removeItem(storageCurrentId);

			}

		}

		// Ajouter tous les produits contenu dans la panier, dans le localStorage 
		for(let j in articlesIntoCart)
		{

			localStorage.setItem(articlesIntoCart[j]._id, JSON.stringify(articlesIntoCart[j]));
		}

		localStorage.setItem("orinoco_cameras_totalArticle", JSON.stringify(totalArticles));
	}

}

function buildingCart()
{
	const cartView = document.getElementById('cartProducts');
	let domGroup = [];
	const validationButton = document.querySelector("#validateOrder");
	cartView.innerHTML = "";
	let cardCartTemplate  = document.getElementById('cardCartView');
	document.getElementById("howCountCart").innerHTML = articlesIntoCart.length;
	if(articlesIntoCart.length > 0)
	{
		for(let i in articlesIntoCart)
		{
			let cardCartTemplateClone = document.importNode(cardCartTemplate.content, true);

			let elementName = cardCartTemplateClone.getElementById('cardCartName');
			elementName.innerHTML = articlesIntoCart[i].name;
			elementName.setAttribute('id', "cardCartName_" + i)

			let elementDescription = cardCartTemplateClone.getElementById('cardCartDescription');
			elementDescription.innerHTML = articlesIntoCart[i].description;
			elementDescription.setAttribute('id', "cardCartDescription_" + i)

			let elementQuantity = cardCartTemplateClone.getElementById('quantityIncrement');
			elementQuantity.setAttribute('id', "quantityIncrement_" + i);

			if(articlesIntoCart.indexOf(articlesIntoCart[i]) >= 0)
			{
				if(totalArticles[i])
				{
					elementQuantity.value = totalArticles[i];
				}

				else
				{
					elementQuantity.value = 1;
				}

			}

			

			let elementPrice = cardCartTemplateClone.getElementById('cardCartPrice');
			elementPrice.setAttribute('id', "cardCartPrice_" + i);

			let elementRemoveToCart = cardCartTemplateClone.getElementById('removeToCart');
			elementRemoveToCart.addEventListener("click", function(e){
				e.preventDefault();
				removeItemOnce(articlesIntoCart[i]);
				buildingCart();


			});
			elementPrice.innerHTML = "Sous-Total : " + (articlesIntoCart[i].price*elementQuantity.value)/100 + " €";
			countItems[articlesIntoCart.indexOf(articlesIntoCart[i])] = parseInt(articlesIntoCart[i].price*elementQuantity.value)/100;

			elementQuantity.addEventListener('change', function(e){
				while(elementQuantity.value <= 0)
				{	
					elementQuantity.value = 1;
				}
				elementPrice.innerHTML = "Sous-Total : " + (articlesIntoCart[i].price*elementQuantity.value)/100 + " €";
				
				let index = articlesIntoCart.indexOf(articlesIntoCart[i]);
				countItems[index] = parseInt(articlesIntoCart[i].price*elementQuantity.value)/100;
				totalArticles[index] = parseInt(elementQuantity.value);
				upgradeTotal();
				updateLocalStorage();
			});



			cartView.appendChild(cardCartTemplateClone);
		}


		validationButton.disabled = false;
	}
	else
	{
		let emptyCardMessage = document.createElement('span');
		cartView.innerHTML = "<span class=\"font-weight-bold text-center bg-dark text-orinoco my-5 d-block\">Votre panier est vide!</span>";
		validationButton.disabled = true;
		$("#cartView").modal("hide");


	}

	upgradeTotal();
	validationButton.addEventListener("click", Cv.updateOrderCv);
}

function removeItemOnce(article) {
	let index = articlesIntoCart.indexOf(article);
	if (index > -1) {
		articlesIntoCart.splice(index, 1);
		countItems.splice(index, 1);
		totalArticles.splice(index, 1);
		document.querySelector('body').prepend(alert.popAlertActionCart("delete", article.name));
		upgradeTotal();
		updateLocalStorage();
	}
}

let test = {}

export function addArticleIntoCart(article, update=1, showAlert=1)
{
	
	let stringsArticlesIntoCard = articlesIntoCart.map(function(a){return JSON.stringify(a)});
	// Comparaison sur l'objet JSON pour empêcher les conflits d'instances.
	if(stringsArticlesIntoCard.indexOf(JSON.stringify(article)) == -1)
	{
		articlesIntoCart.push(article);
		countItems.push(parseInt(article.price/100));
		buildingCart();
		upgradeTotal();
		if(showAlert)
		{

			document.querySelector('body').prepend(alert.popAlertActionCart("add", article.name));
		}

	}

	else
	{
		document.querySelector('body').prepend(alert.popAlertActionCart("already", article.name));

		setTimeout(function(){
			$("#cartView").modal('toggle');

		}, 400);


	}
	if(update)
	{
		updateLocalStorage();

	}
}

function upgradeTotal()
{
	let initItems = 0;
	let initArticles = 0;


	for(let i in countItems)
	{
		initItems += countItems[i];

		if(totalArticles[i] == undefined)
		{
			totalArticles[i] = 1;
		}
		initArticles += totalArticles[i];
	}
	cartTotal = initItems;
	if(initItems)
	{
		document.querySelector("#cartTotal").innerHTML = "Total ("+ initArticles+") : " + initItems + "€";
	}
	else
	{

		document.querySelector("#cartTotal").innerHTML = "";
	}
}

export function getEmpty()
{
	articlesIntoCart = [];
	countItems = [];
	totalArticles = []; 
	cartTotal = 0;
	upgradeTotal();
	updateLocalStorage();
	buildingCart();

}
