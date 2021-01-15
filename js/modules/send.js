import * as Form from "./form.js";
import * as Cart from "./cart.js";
import * as End from "./end.js";



export async function sendOrder()
{
	

	let bodyRequest = JSON.stringify({
	 			"contac": Form.customer, 
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
				End.endOfOrder(product);
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

	for(let i of Cart.articlesIntoCart)
	{
		productArray.push(i._id);
	}

	return productArray;

	// Making a products array
}

