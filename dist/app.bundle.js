/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

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
			"bg": "bg-success"
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
		"cookies":
		{
			"text": "Ce site utilise les cookies pour ameliorer l'experience utilisateur <br><a class=\"read-more\" href=\"\"> en savoir plus...</a>",
			"bg": "bg-dark"
		}
	};

function popAlertActionCart(type, text, autoKill=1){
	
	let alertTemplate = document.querySelector('#alertBox');
	let alertTemplateClone = document.importNode(alertTemplate.content, true);

	let container = alertTemplateClone.querySelector('#alertContainer');
	settingId(container, "" + notificationCount);
	container.classList.add('show', settingOfType[type]["bg"]);

	if(type == "cookies")
	{
		container.classList.remove("fixed-top");
		container.classList.add("fixed-bottom");
		container.classList.add("mb-0");
	}


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

	// .substring(0, -2);

	container.style.zIndex = notificationCount*1 + 1050;
	console.log(container.style.zIndex + "!important");
	if(autoKill)
	{
		let time = setTimeout(function(){

			container.classList.add('d-none');

		}, 4500);

	}
	return alertTemplateClone;

}

function settingId(element, id)
{
	const lastId = element.id;
	element.setAttribute('id', lastId + "_" + id);
}
;// CONCATENATED MODULE: ./js/modules/multi.js







const buttonNextText = ["Valider vos informations", "Ma commande me convient", "Payer", "", "Fermer"];
const buttonPreviousText = ["Fermer", "Modifier vos informations", "Ma commande", ""];
// It is an array fulled with each button's text
let nextStepButton = document.getElementById('nextStep');
let previousStepButton = document.getElementById('previousStep');
let container = document.getElementById('stepContainer');

function multiStepHandeler()
{
	formListener();
	// Init first listener
}


function showPageView(id)
{
	// Give me an id I'll be able to show the proper chidren of the parent
	switchProgress(id);
	switchButton(id);
	let a = -1;
	for(let i of container.children)
	{
		a++;

		if(a == id)
		{

			i.style.display  = "block";
		}
		else
		{
			i.style.display  = "none";

		}
	}
}

function switchButton(id)
{
	// Be switching to good button
	let nextText = buttonNextText[id];
	let previousText = buttonPreviousText[id];
	
	nextStepButton.innerHTML = nextText;
	previousStepButton.innerHTML = previousText;
}

function switchProgress(id)
{
	// Be switching to good progress icone
	let progressItems = document.getElementById('progressbar');
	let a = -1;
	if(id == 4)
	{
		id = 3;
	}
	for(let i of progressItems.children)
	{
		a++;

		if(a == id)
		{

			i.classList.add('active');
		}
		else
		{

			i.classList.remove('active');
		}
	}
}
;// CONCATENATED MODULE: ./js/modules/end.js





let submitButton = document.getElementById("nextStep");

function nextCallBack(e)
{
	$("#submitOrder").modal("hide");
	$("#cartView").modal("hide");
	// Closing multi window and cart window

	formListener();
	// Returning a the start formulaire with keep the owner informations

}

function endOfOrder(e)
{
	showPageView(4);

	document.getElementById("orderNumber").value = e.orderId;

	getEmpty();
	// Getting an empty cart after end of order

	submitButton.removeEventListener("click", payment_nextCallBack);
	submitButton.addEventListener("click", nextCallBack);
	// Add my event listener and remove the others


	setTimeout(function(){
		document.querySelector('body').classList.add("modal-open");
		// Waiting for body get ready back to add a modal-open class
	}, 500);
}


;// CONCATENATED MODULE: ./js/modules/form.js




let prevButton = document.getElementById('previousStep');
let form_submitButton = document.getElementById('nextStep');

let customer = {
	firstName: "",
	lastName: "",
	address:"",
	city: "",
	email: ""
};
// This customer object will be sent

function form_nextCallBack(){

	if(formControl() == 1)
	{
		showOrderCv();
	}
	// Go to next Step if all is fine
}

function previousCallBack()
{
	$("#submitOrder").modal('hide');
	$("#cartView").modal('hide');

	setTimeout(function(){
		$("#cartView").modal('show');
	}, 350);
}

function formListener()
{
	showPageView(0);

	form_submitButton.classList.add("d-block");
	prevButton.classList.add("d-block");

	prevButton.removeEventListener("click", cv_previousCallBack);
	form_submitButton.removeEventListener("click", nextCallBack);
	form_submitButton.removeEventListener("click", cv_nextCallBack);

	form_submitButton.addEventListener("click", form_nextCallBack);
	prevButton.addEventListener("click", previousCallBack);
	// Add my event listener and remove the others
}

function formControl()
{
	const firstName = document.getElementById("firstName");
	const lastName = document.getElementById("lastName");
	const address = document.getElementById("address");
	const city = document.getElementById("city");
	const email = document.getElementById("email");
	let values = [firstName, lastName, address, city, email];
	let good = 1;

	customer.firstName = firstName.value;
	customer.lastName = lastName.value;
	customer.address = address.value;
	customer.city = city.value;
	customer.email = email.value;

	for(let i of values)
	{
		if(i.value == "" || typeof(i.value) != "string")
		{
			i.classList.add("unvalable", "bg-warning");
			good = 0;
		}

		i.addEventListener('focus', function(e){
			e.target.classList.remove('unvalable', "bg-warning");
		})
	}
	return good;

	// Check the good form value is here. Add the good into customers object
	// Alert for the bad inputs
}
;// CONCATENATED MODULE: ./js/modules/send.js






async function sendOrder()
{
	

	let bodyRequest = JSON.stringify({
	 			"contact": customer, 
	 			"products": getProductArray()
	 		});
	// Making body request

	let request = await fetch("https://orinoco-cameras.herokuapp.com/api/cameras/order", {
	 		method: "POST",
	 		body: bodyRequest,
	 		headers: {                           
  				"Content-Type": "application/json"    
 			}             
	 	}).then(function(response){
		if(response.status == 201)
		{
			response.json().then(function(product){
				endOfOrder(product);
			});
		}
		else
		{
			let errorCode = response.status;
			let currentAddress = window.location;
			window.location = "./issues.html?error="+ errorCode+"&from="+currentAddress;
		}
	});
	// Sending the order requeste 
	// return request.json();

}


function getProductArray()
{
	let productArray = [];

	for(let i of articlesIntoCart)
	{
		productArray.push(i._id);
	}

	return productArray;

	// Making a products array
}


;// CONCATENATED MODULE: ./js/modules/payment.js






let payment_submitButton = document.getElementById('nextStep');
let payment_prevButton = document.getElementById('previousStep');
let priceElement = document.getElementById("mainPrice");

function payment_nextCallBack()
{
	showPageView(3);

	payment_submitButton.classList.add("d-none");
	payment_prevButton.classList.add("d-none");

	payment_submitButton.classList.remove("d-block");
	payment_prevButton.classList.remove("d-block");

	sendOrder().then(function(e){
		payment_submitButton.classList.add("d-block");
	}).catch(function(er){
		console.log("Erreur lors de la requête : " + er);
	})
}

function payment_previousCallBack()
{
	showOrderCv();
}


function showPayment()
{
	updatePrice();

	showPageView(2);

	payment_submitButton.removeEventListener("click", cv_nextCallBack);
	payment_submitButton.removeEventListener("click", End.nextCallBack);
	payment_prevButton.removeEventListener("click", cv_previousCallBack);

	payment_submitButton.addEventListener("click", payment_nextCallBack);
	payment_prevButton.addEventListener("click", payment_previousCallBack);
	// Add my event listener and remove the others

}

function updatePrice()
{
	priceElement.innerHTML = cartTotal + "€";
	// Updating the total price

}
;// CONCATENATED MODULE: ./js/modules/cv.js





let table = document.querySelector('#cvView tbody');
let cv_submitButton = document.getElementById('nextStep');
let cv_prevButton = document.getElementById('previousStep');


let total = document.getElementById('priceTotal');

function cv_nextCallBack()
{
	showPayment();
}

function cv_previousCallBack()
{
	formListener();
}

function showOrderCv()
{
	updateOrderCv();
	
	showPageView(1);

	cv_submitButton.removeEventListener("click", form_nextCallBack);
	cv_submitButton.removeEventListener("click", payment_nextCallBack);
	cv_prevButton.removeEventListener("click", payment_previousCallBack);
	cv_prevButton.removeEventListener("click", previousCallBack);

	cv_submitButton.addEventListener("click", cv_nextCallBack);
	cv_prevButton.addEventListener("click", cv_previousCallBack);
	// Add my event listener and remove the others


}

function updateOrderCv()
{
	let cartItems = articlesIntoCart;
	table.innerHTML = "";
	total.innerHTML = cartTotal + "€";

	for(let i in cartItems)
	{
		let row = document.createElement("tr");

		let quantity = document.createElement("td");
		quantity.innerHTML = totalArticles[i];

		let name = document.createElement("td");
		name.innerHTML = cartItems[i].name;

		let unitPrice = document.createElement("td");
		unitPrice.innerHTML = cartItems[i].price/100 + "€";

		let multiPrice = document.createElement("td");
		multiPrice.innerHTML = totalArticles[i] * cartItems[i].price/100 + "€";

		row.appendChild(quantity);
		row.appendChild(name);
		row.appendChild(unitPrice);
		row.appendChild(multiPrice);

		table.appendChild(row);



	}

	updatePrice();

	// Making a order table with all the products
}
;// CONCATENATED MODULE: ./js/modules/getProductData.js
let dataDownloaded = document.createEvent("event");
dataDownloaded.initEvent("dataisready", true, true);

let data = [];

function productData()
{
	const url = "https://orinoco-cameras.herokuapp.com/api/cameras";

	fetch(url).then(function(response){
		if(response.status == 200)
		{
			response.json().then(function(d){

				if(d.length >= 1)
				{
					data = d;

					document.dispatchEvent(dataDownloaded);
				}
			});
		}
		else
		{
			let errorCode = response.status;
			let currentAddress = window.location;
			window.location = "./issues.html?error="+ errorCode+"&from="+currentAddress;
		}
	});
	
}
productData();
// let res = productData().then(function(e){
// 	console.log(JSON.parse(e),"then")
// 	if(e.status == 200)
// 	{
// 		if(e.length >= 1)
// 		{
// 			data = e;
// 			document.dispatchEvent(dataDownloaded);
// 		}
// 	}
// 	else
// 	{
// 		console.log(e.status);
// 	}
// }).catch(function(e){

// 	console.log(e.satus);
// });

function isIdOfProduct(id)
{
	let isOneOfThem = data.map(function(d){return (d._id == id)});
	if(isOneOfThem.indexOf(true) == -1)
	{
		return false;
	}
	else
	{
		return true;
	}
}


;// CONCATENATED MODULE: ./js/modules/detectLocalStorage.js
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
}
;// CONCATENATED MODULE: ./js/modules/cart.js







let articlesIntoCart = [];//Liste des articles dans le panier
let countItems = [];//Liste des sous totaux
let totalArticles = [];//Liste des quantité par article 
let cartTotal = 0;

let cart_storageAvailable = storageAvailable('localStorage') ? true : false;

function initCart()
{
	if(cart_storageAvailable)
	{
		document.querySelector('body').appendChild(popAlertActionCart("cookies", "", 0));
		
		if(localStorage.getItem("orinoco_cameras_totalArticle") != null)
		{

			totalArticles = JSON.parse(localStorage.getItem("orinoco_cameras_totalArticle"));
		}

		for(let i in localStorage)
		{

			if(isIdOfProduct(i) == true)
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
	if(cart_storageAvailable)
	{
		let idsInCart = articlesIntoCart.map(function(p){return p._id});

		for(let i in localStorage)
		{
			let storageCurrentId = i;
			// si la clé du localStorage fait référence à un produit de la gamme
			// Suprimer le produits du localStorage.
			if(isIdOfProduct(storageCurrentId) == true)
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
	validationButton.addEventListener("click", updateOrderCv);
}

function removeItemOnce(article) {
	let index = articlesIntoCart.indexOf(article);
	if (index > -1) {
		articlesIntoCart.splice(index, 1);
		countItems.splice(index, 1);
		totalArticles.splice(index, 1);
		document.querySelector('body').prepend(popAlertActionCart("delete", article.name));
		upgradeTotal();
		updateLocalStorage();
	}
}

let test = {}

function addArticleIntoCart(article, update=1, showAlert=1)
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

			document.querySelector('body').prepend(popAlertActionCart("add", article.name));
		}

	}

	else
	{
		document.querySelector('body').prepend(popAlertActionCart("already", article.name));

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

function getEmpty()
{
	articlesIntoCart = [];
	countItems = [];
	totalArticles = []; 
	cartTotal = 0;
	upgradeTotal();
	updateLocalStorage();
	buildingCart();

}

;// CONCATENATED MODULE: ./js/modules/template.js




function getStoreCardFromTemplate(productData, id)
{
	// Be generating a product view from his template for main view box
	getSelectedCardFromTemplate(productData, id);
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
	// Be generating a product view from his template for selected produts view box
	let selectedTemplate = document.querySelector('#modalBox');
	let selectedTemplateClone = document.importNode(selectedTemplate.content, true);

	let containerModal = selectedTemplateClone.querySelector('#selectedModalBox');
	template_settingId(containerModal, id);
	containerModal.setAttribute('aria-labelledby', "selectedProductTitle_" + id)

	let selectedTitle = selectedTemplateClone.querySelector('#selectedModalTitle');
	template_settingId(selectedTitle, id);
	selectedTitle.innerHTML = productData.name;

	let openWindow = selectedTemplateClone.querySelector("#openWindow");

	openWindow.addEventListener("click", function(e){
		e.preventDefault();
		let popupURL = './pop-up.html?id='+productData._id;
		window.open(popupURL,'nom_de_ma_popup','menubar=no, scrollbars=no, top=100, left=100, width=600, height=auto');
	});

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
	// Be concatenating id string to a unique number added
	const lastId = element.id;
	element.setAttribute('id', lastId + "_" + id);
}
;// CONCATENATED MODULE: ./js/modules/unitProduct.js




async function createAProductCard(productData, id)
{
    let content  = await getStoreCardFromTemplate(productData, id);
    return content;
    // Give card product when it built off
}

;// CONCATENATED MODULE: ./js/modules/mainProductList.js




function buildCardsDeck(){

  let deck = document.getElementById('deck-cameras');

  // let cloneTemplateView = document.importNode(templateView.content, true);

  // let deck = cloneTemplateView.getElementById('deck');
  // deck.setAttribute("id", "deck-cameras");

  // let deckTitle = cloneTemplateView.getElementById('productTitle');
  // deck.appendChild(deckTitle);
  // Be getting for a deck from his template

  for(let i in data)
  {
      let idCard = ("cameras_" + i);

      createAProductCard(data[i], idCard).then(function(e){
          deck.appendChild(e);

     }).then(function(){

          document.getElementById("waiting").classList.add("d-none");
          
     }).catch(function(e){

      console.log("ERREUR: \n" + e);
    });
    // Be getting a card for each products there are into data


 }
 // return cloneTemplateView;:=
}
;// CONCATENATED MODULE: ./js/modules/eventCartBtn.js

// Event in addition with the native bootstrap modal events

let btnCart = document.querySelector("#cartToggle");
let btnClicked = 0;
let btnPosMobileTopMax = parseInt(window.screen.height - 100);
let btnPosMobileLeft = btnCart.style.left;
let btnCartMovable = 1;


function initMovedBtnEvent()
{



// Event for the cart button when there is a navigation by mouse.


// When mouse is getting down on cart's button
btnCart.addEventListener("mousedown", function(e){
	btnClicked = 1;
	btnCart.style.transition = "left 0s ease-out";
});
// Cart's button follows mouse moved until mouseup event is happened.
document.addEventListener("mousemove", function(e){
	
	if(btnClicked == 1)
	{
		if(parseInt(e.clientX) < parseInt((window.screen.width - 120)))
		{
			btnCart.style.left = parseInt(e.clientX) + "px";
		}
		else
		{
			btnCart.style.left = parseInt((window.screen.width - 120)) + "px";

		}

		if(parseInt(e.clientY) > 0)
		{
			btnCart.style.top = parseInt(e.clientY) + "px";

		}

		if(parseInt(e.clientY) > parseInt(window.screen.height - 250))
		{
			btnCart.style.top = parseInt(window.screen.height - 250) + "px";

		}

	}
	
});

// When mouse is getting up anywhere
// Cart's button goes at closer side of the screen when mouseup event is sent and it still folows mouse.
document.addEventListener("mouseup", function(e){

	btnCart.style.transition = "left 0.5s ease-out";
	if(btnClicked == 1)
	{
		
		if(parseInt(e.clientX) < parseInt((window.screen.width - 80)/2))
		{

			btnCart.style.left = "0px";
		}

		else
		{
			btnCart.style.left = parseInt((window.screen.width - 80)) + "px";

		}
	}
	btnClicked = 0;
});




// Event for the cart button when there is a navigation by finger or other pointer.

// All this event listeners are an adaptation of the ones are up to "touch" way navigation. 

// Same to mousedown
btnCart.addEventListener("touchstart", function(e){
	btnClicked = 1;
	btnCart.style.transition = "left 0s ease-out";

}, false);

// Same to mouseup
btnCart.addEventListener("touchend", function(e){
	btnCart.style.transition = "left 0.5s ease-out";
	btnClicked = 0;
	btnCart.style.left = btnPosMobileLeft + "px";
}, false);

// Sames to mousemove
btnCart.addEventListener("touchmove", function(e){
	e.preventDefault();
	if(btnClicked == 1)
	{
		if(parseInt(e.touches[0].clientX) < parseInt((window.screen.width - 80)))
		{
			btnCart.style.left = parseInt(e.touches[0].clientX) + "px";
		}
		else
		{
			btnCart.style.left = parseInt((window.screen.width - 80)) + "px";

		}

		if(parseInt(e.touches[0].clientX) < 0)
		{
			btnCart.style.left = "0px";

		}

		if(parseInt(e.touches[0].clientY) > 0)
		{
			btnCart.style.top = parseInt(e.touches[0].clientY) + "px";

		}

		if(parseInt(e.touches[0].clientY) > btnPosMobileTopMax)
		{
			btnCart.style.top = btnPosMobileTopMax + "px";

		}

		if(parseInt(e.touches[0].clientX) < parseInt((window.screen.width - 80)/2))
		{
			btnPosMobileLeft = 0;

		}
		else
		{
			btnPosMobileLeft = parseInt((window.screen.width - 80));

		}

			console.log(btnCart.style.left);


	}
	
}, false);
}
;// CONCATENATED MODULE: ./js/index.js





window.addEventListener("DOMContentLoaded", function(e){
	// When Dom is loaded
	document.addEventListener("dataisready", function(){
		// Be listening for dataisready event
		buildCardsDeck();
		// Be building cards of products
		initCart();
	// Initialising cart from localStorage

	});

	multiStepHandeler();
	// Be initialising for multi step windows event listener 
	initMovedBtnEvent();
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


/******/ })()
;