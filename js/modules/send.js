import * as Form from "./form.js";
import * as Cart from "./cart.js";


export async function sendOrder()
{
	

	let bodyRequest = JSON.stringify({
	 			"contact": Form.customer, 
	 			"products": getProductArray()
	 		});
	// Making body request

	let request = await fetch("https://orinoco-cameras.herokuapp.com/api/cameras/order", {
	 		method: "POST",
	 		body: bodyRequest,
	 		headers: {                           
  				"Content-Type": "application/json"    
 			}             
	 	});
	// Sending the order requeste 
	return request.json();

}


function getProductArray()
{
	let productArray = [];

	for(let i of Cart.articlesIntoCart)
	{
		productArray.push(i._id);
	}

	return productArray;

	// Making a products array
}

