import * as product from "./unitProduct.js";
import {data} from "./getProductData.js";


export function buildCardsDeck(){

  let deck = document.getElementById('deck-cameras');

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