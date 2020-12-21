/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./js/query.js

async function retrieveContent(categorie) {
	const url = "http://localhost:3000/api/"+ categorie +"/";

	const response = await fetch(url);
	return response.json();
}



;// CONCATENATED MODULE: ./js/building.js

function buildCardsDeck(content, id){

  let templateView = document.getElementById('productsView');

  let cloneTemplateView = document.importNode(templateView.content, true);

  let deck = cloneTemplateView.getElementById('deck');
  deck.classList.add("bg-custom-" + id);
  deck.setAttribute("id", "deck-"+ id);

  let deckTitle = cloneTemplateView.getElementById('productTitle');
  deck.classList.add('col-12');
  deck.appendChild(deckTitle);

  for(let i in content)
  {
    console.log(cloneTemplateView);
    let idCard = (id + "_" + i);
    deck.appendChild(createAProductCard(content[i], idCard));


  }
  console.log(deck);
  return cloneTemplateView;
}

function createAProductCard(productData, id)
{
  let templateCard = document.getElementById('productCard');

  let cloneTemplateCard = document.importNode(templateCard.content, true);
  console.log(cloneTemplateCard);

  let card = cloneTemplateCard.getElementById('card');
  card.setAttribute('id', "card"+id);

  let imgCard = cloneTemplateCard.getElementById('cardImg');
  imgCard.setAttribute('src', productData.imageUrl);
  imgCard.setAttribute('alt', "Photo du "+productData.name);

  let textCard = cloneTemplateCard.getElementById('cardBody');

  let nameCard = cloneTemplateCard.getElementById('cardName');
  nameCard.innerHTML = productData.name;

  let containDescriptionCard = cloneTemplateCard.getElementById('cardCollapse');
  containDescriptionCard.setAttribute('id', id);

  let descriptionCard = cloneTemplateCard.getElementById('cardDescription');
  descriptionCard.innerHTML = productData.description;

  let parentVariant = cloneTemplateCard.getElementById('productVariant');

  let priceCard = cloneTemplateCard.getElementById('cardPrice');
  priceCard.innerHTML = (productData.price)/100 + " €";

  let showMoreDescription = cloneTemplateCard.getElementById('cardShowMore');
  showMoreDescription.setAttribute('href', "#"+ id);
  showMoreDescription.setAttribute('aria-controls', id);
  showMoreDescription.addEventListener("click", function(e){
      e.target.classList.toggle("seeProduct");
      e.target.classList.toggle("hiddeProduct");    
  })



  let bonus = ["colors", "lenses", "varnish"];

  containDescriptionCard.appendChild(descriptionCard);
  containDescriptionCard.appendChild(buildVariantChoice(productData[Object.keys(productData)[0]], parentVariant));
  containDescriptionCard.appendChild(priceCard);

  textCard.appendChild(nameCard);
  textCard.appendChild(containDescriptionCard);
  textCard.appendChild(showMoreDescription);

  card.appendChild(imgCard);
  card.appendChild(textCard);

  return card;
}


function buildVariantChoice(content, parent){

  let group = parent;


  for(let i in content){
    let choiceElement = document.createElement('a');

    choiceElement.classList.add('col-12', 'text-orinoco', 'text-center');
    choiceElement.innerHTML = content[i];

    group.appendChild(choiceElement);
  }

  return group;
}

function toCamelCase(str){
  let string = str.split(" ");
  let camelCase = [];
  for(let i in string)
  {
    if(i == 0){
      camelCase.push(string[i].toLowerCase());
    }

    else
    {
      camelCase.push(string[i][0].toUpperCase() + string[i].slice(1));

    }
  }

  // console.log(camelCase);
  return camelCase.join("")
}
;// CONCATENATED MODULE: ./js/index.js




async function showContent() {

  const categories = ["cameras"];
  try {
    for(let i = 0; i < categories.length; i++){

      if(categories[i] != undefined){

        const content = await retrieveContent(categories[i]).then(function(content){

          document.getElementById("camerasView").appendChild(buildCardsDeck(content, categories[i]));
          console.log(buildCardsDeck(content, categories[i]));
        });
      }
    }
    
  } catch (e) {
    console.log('Error', e);
  }
}


// function popedStuff(e){
//     document.getElementById("modalBody").appendChild(e);
 
// }
// // createADiv();s

showContent().then(function(){
  let event = document.getElementById('strechedLinkCard'); 
  // event.addEventListener('click', popedStuff(event.nodeParent));
});

/******/ })()
;