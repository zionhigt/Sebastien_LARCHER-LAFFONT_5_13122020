/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./js/modules/getProductData.js
async function productData()
{
	const url = "http://localhost:3001/api/cameras/";

	const response = await fetch(url);
	return response.json();
}

let data =[];
let res = productData().then(function(e){
	if(e.length >= 1)
	{
		data = e;
		document.querySelector('body').dispatchEvent(dataDownloaded);
	}
}).catch(function(e){

	console.log("ERREUR: \n" + e);
});

let dataDownloaded = document.createEvent("event");
dataDownloaded.initEvent("dataisready", true, true);
;// CONCATENATED MODULE: ./js/modules/variantChoice.js
function buildVariantChoice(content, parent){

  let group = parent;
  

  for(let i in content){
    let choiceElement = document.createElement('option');
    choiceElement.setAttribute('value', content[i]);

    choiceElement.classList.add('col-12', 'text-orinoco', 'text-center', 'bg-primary');
    choiceElement.innerHTML = content[i];

    group.appendChild(choiceElement);
  }

  return group;
}
;// CONCATENATED MODULE: ./js/modules/alert.js
let notificationCount = 0;
const settingOfType = {
		"add": {
			"text": " à été ajouté a votre panier !",
			"bg": "bg-primary"
		},

		"delete":
		{
			"text": " à été supprimé de votre panier !",
			"bg": "bg-danger" 
		},
		"already":
		{
			"text":" est déjà dans votre panier",
			"bg": "bg-info" 
		},
	};

function popAlertAddingCart(type, text){
	
	let alertTemplate = document.querySelector('#alertBox');
	let alertTemplateClone = document.importNode(alertTemplate.content, true);

	let container = alertTemplateClone.querySelector('#alertContainer');
	settingId(container, "" + notificationCount);
	container.classList.add('show', settingOfType[type]["bg"]);


	let alertName = alertTemplateClone.querySelector('#alertName');
	settingId(alertName,"" + notificationCount);
	alertName.innerHTML = text;

	let alertMessage = alertTemplateClone.querySelector('#alertMessage');
	settingId(alertMessage,"" + notificationCount);
	alertMessage.innerHTML = settingOfType[type]["text"];

	notificationCount++;
	if(notificationCount > 50)
	{
		notificationCount = 0;
	}

	// container.style.top = notificationCount*30 +"px";
	container.style.zIndex = notificationCount*2 + "";
	let time = setTimeout(function(){

		container.classList.add('d-none');

	}, 4500);

	return alertTemplateClone;

}

function settingId(element, id)
{
	const lastId = element.id;
	element.setAttribute('id', lastId + "_" + id);
}
;// CONCATENATED MODULE: ./js/modules/cart.js


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
		document.querySelector('body').prepend(popAlertAddingCart("delete", article.name));
		upgradeTotal();
		totalArticles--;
		totalArticles++;
	}
}

function addArticleIntoCart(article)
{
	if(!(articlesIntoCart.includes(article)))
	{
		articlesIntoCart.push(article);
		countItems.push(parseInt(article.price/100));
		buildingCart();
		document.querySelector('body').prepend(popAlertAddingCart("add", article.name));
		upgradeTotal();
		totalArticles++;


	}

	else
	{
		document.querySelector('body').prepend(popAlertAddingCart("already", article.name));

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

;// CONCATENATED MODULE: ./js/modules/template.js




async function getMainCardFromTemplate(productData, id)
{
	await getSelectedCardFromTemplate(productData, id);
	let templateCard = document.querySelector('#productCard');


	let cloneTemplateCard = document.importNode(templateCard.content, true);

	let card = cloneTemplateCard.querySelector('#card');
	template_settingId(card, id);


	let imgCard = cloneTemplateCard.querySelector('#cardImg');
	template_settingId(imgCard, id);
	imgCard.setAttribute('src', productData.imageUrl);
	imgCard.setAttribute('alt', "Photo du "+productData.name);

	let textCard = cloneTemplateCard.querySelector('#cardBody');
	template_settingId(textCard, id);


	let nameCard = cloneTemplateCard.querySelector('#cardName');
	nameCard.innerHTML = productData.name;
	template_settingId(nameCard, id);


	let showMoreDescription = cloneTemplateCard.querySelector('#cardShowMore');
	template_settingId(showMoreDescription, id);
	// showMoreDescription.setAttribute('href', "#"+ id);
	showMoreDescription.setAttribute('data-target', "#selectedModalBox_"+id);
	showMoreDescription.setAttribute('aria-controls', "selectedModalBox_"+id);

	return card;
}

function getSelectedCardFromTemplate(productData, id)
{
	let selectedTemplate = document.querySelector('#modalBox');
	let selectedTemplateClone = document.importNode(selectedTemplate.content, true);

	let containerModal = selectedTemplateClone.querySelector('#selectedModalBox');
	template_settingId(containerModal, id);
	containerModal.setAttribute('aria-labelledby', "selectedProductTitle_" + id)

	let selectedTitle = selectedTemplateClone.querySelector('#selectedModalTitle');
	template_settingId(selectedTitle, id);
	selectedTitle.innerHTML = productData.name;

	let selectedImg = selectedTemplateClone.querySelector('img');
	template_settingId(selectedImg, id);
	selectedImg.setAttribute('src', productData.imageUrl);
	selectedImg.setAttribute('alt', "Photo du "+productData.name);

	let modalDescription = selectedTemplateClone.querySelector('#modalDescription');
	template_settingId(modalDescription, id);
	modalDescription.innerHTML = productData.description;

	let modalPrice = selectedTemplateClone.querySelector('#modalPrice');
	template_settingId(modalPrice, id);
	modalPrice.innerHTML = (productData.price)/100 + " €";

	let labelVariantChoice = selectedTemplateClone.querySelector('#labelProductVariant');
	template_settingId(labelVariantChoice, id);
	labelVariantChoice.setAttribute('for', "productVariant_" + id);

	let variantChoiceModal = selectedTemplateClone.querySelector('#productVariant');
	template_settingId(variantChoiceModal, id);
	buildVariantChoice(productData.lenses, variantChoiceModal);

	let addToCartBtn = selectedTemplateClone.querySelector('#addToCartBtn');
	template_settingId(addToCartBtn, id);
	addToCartBtn.addEventListener("click", function(){
		addArticleIntoCart(productData);
	});

	document.querySelector('main').appendChild(selectedTemplateClone);


}

function template_settingId(element, id)
{
	// console.log(element);
	const lastId = element.id;
	element.setAttribute('id', lastId + "_" + id);
}
;// CONCATENATED MODULE: ./js/modules/unitProduct.js




async function createAProductCard(productData, id)
{
    let content  = await getMainCardFromTemplate(productData, id);
    return content;


 
  // addToCart.addEventListener("click", function(e){
  //     if(!(articlesIntoCart.includes(productData)))
  //       {
  //         articlesIntoCart.push(productData);

  //       }
  //     addElementIntoCart();
  // });


}

// export async function showProductInModalBOx(productData)
// {
// 	let content = await template.getSelectedCardFromTemplate(productData);
// 	return content;
// }
;// CONCATENATED MODULE: ./js/modules/mainProductList.js



function buildCardsDeck(content){

  let templateView = document.getElementById('productsView');

  let cloneTemplateView = document.importNode(templateView.content, true);

  let deck = cloneTemplateView.getElementById('deck');
  deck.setAttribute("id", "deck-cameras");

  let deckTitle = cloneTemplateView.getElementById('productTitle');
  deck.appendChild(deckTitle);

  for(let i in content)
  {
    let idCard = ("cameras_" + i);
    // deck.appendChild(product.createAProductCard(content[i], idCard));
    createAProductCard(content[i], idCard).then(function(e){
       deck.appendChild(e);
    })


  }
  return cloneTemplateView;
}
;// CONCATENATED MODULE: ./js/index.js





document.querySelector('body').addEventListener("dataisready", function(){

	document.querySelector("#camerasView").appendChild(buildCardsDeck(data));
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


/******/ })()
;