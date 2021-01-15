// Make a build of an independant product window

const locationSearch = window.location.search;

async function getProductById(id)
{
	const url = "https://orinoco-cameras.herokuapp.com/api/cameras/"+id;

	let productGetter = await fetch(url).then(function(response){
		if(response.status == 200)
		{
			response.json().then(function(product){
				document.getElementById("waiting").classList.add("d-none");
				showProduct(product);
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

function getIdInURL(param)
{
	let params = new URLSearchParams(locationSearch);

	return params.get(param);
}

function showProduct(productData, id=1)
{
	// Be generating a product view from his template for selected produts view box
	let selectedTemplate = document.querySelector('#cardBox');
	let selectedTemplateClone = document.importNode(selectedTemplate.content, true);

	let containerCard = selectedTemplateClone.querySelector('#selectedCardBox');
	settingId(containerCard, id);
	containerCard.setAttribute('aria-labelledby', "selectedProductTitle_" + id)

	let selectedTitle = selectedTemplateClone.querySelector('#selectedCardTitle');
	settingId(selectedTitle, id);
	selectedTitle.innerHTML = productData.name;

	let selectedImg = selectedTemplateClone.querySelector('img');
	settingId(selectedImg, id);
	selectedImg.setAttribute('src', productData.imageUrl);
	selectedImg.setAttribute('alt', "Photo du "+productData.name);

	let cardDescription = selectedTemplateClone.querySelector('#cardDescription');
	settingId(cardDescription, id);
	cardDescription.innerHTML = productData.description;

	let cardPrice = selectedTemplateClone.querySelector('#cardPrice');
	settingId(cardPrice, id);
	cardPrice.innerHTML = (productData.price)/100 + " €";

	let labelVariantChoice = selectedTemplateClone.querySelector('#labelProductVariant');
	settingId(labelVariantChoice, id);
	labelVariantChoice.setAttribute('for', "productVariant_" + id);

	let variantChoiceCard = selectedTemplateClone.querySelector('#productVariant');
	settingId(variantChoiceCard, id);
	buildVariantChoice(productData.lenses, variantChoiceCard);

	document.querySelector('body').appendChild(selectedTemplateClone);
}

function settingId(element, id)
{
	// Be concatenating id string to a unique number added
	const lastId = element.id;
	element.setAttribute('id', lastId + "_" + id);
}

function buildVariantChoice(content, parent){

  let group = parent;
  

  for(let i in content){
    let choiceElement = document.createElement('li');
    choiceElement.innerHTML = content[i];

    choiceElement.classList.add('col-12', 'text-orinoco', 'text-center', 'bg-primary');
    choiceElement.innerHTML = content[i];

    group.appendChild(choiceElement);
  }

  return group;
}

getProductById(getIdInURL("id"));
