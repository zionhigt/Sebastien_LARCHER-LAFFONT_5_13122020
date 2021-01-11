import * as alert from "./alert.js";
import * as Cv from "./cv.js";



export let articlesIntoCart = [];//Liste des articles dans le panier
export let countItems = [];//Liste des sous totaux
export let totalArticles = [];//Liste des quantité par article 
export let cartTotal = 0;

function buildingCart()
{
	let cartView = document.getElementById('cartProducts');
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
				elementQuantity.value = countItems[articlesIntoCart.indexOf(articlesIntoCart[i])]/articlesIntoCart[i].price*100;

			}

			let elementPrice = cardCartTemplateClone.getElementById('cardCartPrice');
			elementPrice.setAttribute('id', "cardCartPrice_" + i);
			elementPrice.innerHTML = "Sous-Total : " + (articlesIntoCart[i].price*elementQuantity.value)/100 + " €";



			let elementRemoveToCart = cardCartTemplateClone.getElementById('removeToCart');
			elementRemoveToCart.addEventListener("click", function(e){
				e.preventDefault();
				removeItemOnce(articlesIntoCart[i]);
				buildingCart();


			});

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
			});



			cartView.appendChild(cardCartTemplateClone);
		}


		validationButton.disabled = false;
	}
	else
	{
		let emptyCardMessage = document.createElement('span');
		// emptyCardMessage.classList.add('font-weight-bold', 'text-center', 'bg-dark', 'text-orinoco');
		cartView.innerHTML = "<span class=\"font-weight-bold text-center bg-dark text-orinoco my-5 d-block\">Votre panier est vide!</span>";
		validationButton.disabled = true;
		$("#cartView").modal("hide");


	}

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
	}
}

export function addArticleIntoCart(article)
{
	if(!(articlesIntoCart.includes(article)))
	{
		articlesIntoCart.push(article);
		countItems.push(parseInt(article.price/100));
		totalArticles.push(1);
		buildingCart();
		document.querySelector('body').prepend(alert.popAlertActionCart("add", article.name));
		upgradeTotal();


	}

	else
	{
		document.querySelector('body').prepend(alert.popAlertActionCart("already", article.name));
		// jQuery.noConflict();
		setTimeout(function(){
			$("#cartView").modal('toggle');

		}, 400);
		// document.querySelector('body').classList.add("modal-open");


	}
}

function upgradeTotal()
{
	let initItems = 0;
	let initArticles = 0;

	console.log(totalArticles);

	for(let i in countItems)
	{
		initItems += countItems[i];
		initArticles += totalArticles[i];
	}
	cartTotal = initItems;
	document.querySelector("#cartTotal").innerHTML = "Total ("+ initArticles+") : " + initItems + "€";
}

export function getEmpty()
{
	articlesIntoCart = [];
	countItems = [];
	totalArticles = []; 
	cartTotal = 0;
	upgradeTotal();
	buildingCart();

}
