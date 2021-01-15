import * as variantChoice from "./variantChoice";
import * as cart from "./cart.js";


export function getStoreCardFromTemplate(productData, id)
{
	// Be generating a product view from his template for main view box
	getSelectedCardFromTemplate(productData, id);
	let templateCard = document.querySelector('#productCard');


	let cloneTemplateCard = document.importNode(templateCard.content, true);

	let card = cloneTemplateCard.querySelector('#card');
	settingId(card, id);


	let imgCard = cloneTemplateCard.querySelector('#cardImg');
	settingId(imgCard, id);
	imgCard.setAttribute('src', productData.imageUrl);
	imgCard.setAttribute('alt', "Photo du "+productData.name);

	let textCard = cloneTemplateCard.querySelector('#cardBody');
	settingId(textCard, id);


	let nameCard = cloneTemplateCard.querySelector('#cardName');
	nameCard.innerHTML = productData.name;
	settingId(nameCard, id);


	let showMoreDescription = cloneTemplateCard.querySelector('#cardShowMore');
	settingId(showMoreDescription, id);
	// showMoreDescription.setAttribute('href', "#"+ id);
	showMoreDescription.setAttribute('data-target', "#selectedModalBox_"+id);
	showMoreDescription.setAttribute('aria-controls', "selectedModalBox_"+id);

	return card;
}

export function getSelectedCardFromTemplate(productData, id)
{
	// Be generating a product view from his template for selected produts view box
	let selectedTemplate = document.querySelector('#modalBox');
	let selectedTemplateClone = document.importNode(selectedTemplate.content, true);

	let containerModal = selectedTemplateClone.querySelector('#selectedModalBox');
	settingId(containerModal, id);
	containerModal.setAttribute('aria-labelledby', "selectedProductTitle_" + id)

	let selectedTitle = selectedTemplateClone.querySelector('#selectedModalTitle');
	settingId(selectedTitle, id);
	selectedTitle.innerHTML = productData.name;

	let openWindow = selectedTemplateClone.querySelector("#openWindow");

	openWindow.addEventListener("click", function(e){
		e.preventDefault();
		let popupURL = './pop-up.html?id='+productData._id;
		window.open(popupURL,'nom_de_ma_popup','menubar=no, scrollbars=no, top=100, left=100, width=600, height=auto');
	});

	let selectedImg = selectedTemplateClone.querySelector('img');
	settingId(selectedImg, id);
	selectedImg.setAttribute('src', productData.imageUrl);
	selectedImg.setAttribute('alt', "Photo du "+productData.name);

	let modalDescription = selectedTemplateClone.querySelector('#modalDescription');
	settingId(modalDescription, id);
	modalDescription.innerHTML = productData.description;

	let modalPrice = selectedTemplateClone.querySelector('#modalPrice');
	settingId(modalPrice, id);
	modalPrice.innerHTML = (productData.price)/100 + " €";

	let labelVariantChoice = selectedTemplateClone.querySelector('#labelProductVariant');
	settingId(labelVariantChoice, id);
	labelVariantChoice.setAttribute('for', "productVariant_" + id);

	let variantChoiceModal = selectedTemplateClone.querySelector('#productVariant');
	settingId(variantChoiceModal, id);
	variantChoice.buildVariantChoice(productData.lenses, variantChoiceModal);

	let addToCartBtn = selectedTemplateClone.querySelector('#addToCartBtn');
	settingId(addToCartBtn, id);
	addToCartBtn.addEventListener("click", function(){
		cart.addArticleIntoCart(productData);
	});

	document.querySelector('main').appendChild(selectedTemplateClone);


}

function settingId(element, id)
{
	// Be concatenating id string to a unique number added
	const lastId = element.id;
	element.setAttribute('id', lastId + "_" + id);
}