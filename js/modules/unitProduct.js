import * as template from "./template.js";



export async function createAProductCard(productData, id)
{
    let content  = await template.getMainCardFromTemplate(productData, id);
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