import * as product from "./unitProduct.js";
import {data} from "./getProductData.js";


export function buildCardsDeck(){

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

      product.createAProductCard(data[i], idCard).then(function(e){
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