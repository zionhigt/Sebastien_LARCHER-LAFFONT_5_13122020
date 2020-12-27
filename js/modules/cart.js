import * as alert from "./alert.js";

let articlesIntoCart = [];
let countItems = [];
let totalArticles = 0;

function buildingCart()
{
	let cartView = document.getElementById('cartProducts');
	let domGroup = [];
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
				upgradeTotal();
			});



			cartView.appendChild(cardCartTemplateClone);
		}

	}
	else
	{
		let emptyCardMessage = document.createElement('span');
		// emptyCardMessage.classList.add('font-weight-bold', 'text-center', 'bg-dark', 'text-orinoco');
		cartView.innerHTML = "<span class=\"font-weight-bold text-center bg-dark text-orinoco my-5 d-block\">Votre panier est vide!</span>";
	}
}

function removeItemOnce(article) {
	let index = articlesIntoCart.indexOf(article);
	if (index > -1) {
		articlesIntoCart.splice(index, 1);
		countItems.splice(index, 1);
		document.querySelector('body').prepend(alert.popAlertAddingCart("delete", article.name));
		upgradeTotal();
		totalArticles--;
		totalArticles++;
	}
}

export function addArticleIntoCart(article)
{
	if(!(articlesIntoCart.includes(article)))
	{
		articlesIntoCart.push(article);
		countItems.push(parseInt(article.price/100));
		buildingCart();
		document.querySelector('body').prepend(alert.popAlertAddingCart("add", article.name));
		upgradeTotal();
		totalArticles++;


	}

	else
	{
		document.querySelector('body').prepend(alert.popAlertAddingCart("already", article.name));

	}
}

function upgradeTotal()
{
	let init = 0;
	for(let i in countItems)
	{
		init += countItems[i];
	}
	document.querySelector("#cartTotal").innerHTML = "Total (x) : " + init + "€";
}
