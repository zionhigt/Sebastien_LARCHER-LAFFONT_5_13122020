import * as product from "./unitProduct.js";


export function buildCardsDeck(content){

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
    product.createAProductCard(content[i], idCard).then(function(e){
       deck.appendChild(e);
    })


  }
  return cloneTemplateView;
}