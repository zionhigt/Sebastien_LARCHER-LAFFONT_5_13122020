import * as Cart from "./cart.js";
import * as Payment from "./payment.js";
import * as Multi from "./multi.js";
import * as Form from "./form.js";

let table = document.querySelector('#cvView tbody');
let submitButton = document.getElementById('nextStep');
let prevButton = document.getElementById('previousStep');


let total = document.getElementById('priceTotal');

export function nextCallBack()
{
	Payment.showPayment();
}

export function previousCallBack()
{
	Form.formListener();
}

export function showOrderCv()
{
	updateOrderCv();
	
	Multi.showPageView(1);

	submitButton.removeEventListener("click", Form.nextCallBack);
	submitButton.removeEventListener("click", Payment.nextCallBack);
	prevButton.removeEventListener("click", Payment.previousCallBack);
	prevButton.removeEventListener("click", Form.previousCallBack);

	submitButton.addEventListener("click", nextCallBack);
	prevButton.addEventListener("click", previousCallBack);
	// Add my event listener and remove the others


}

export function updateOrderCv()
{
	let cartItems = Cart.articlesIntoCart;
	table.innerHTML = "";
	total.innerHTML = Cart.cartTotal + "€";

	for(let i in cartItems)
	{
		let row = document.createElement("tr");

		let quantity = document.createElement("td");
		quantity.innerHTML = Cart.totalArticles[i];

		let name = document.createElement("td");
		name.innerHTML = cartItems[i].name;

		let unitPrice = document.createElement("td");
		unitPrice.innerHTML = cartItems[i].price/100 + "€";

		let multiPrice = document.createElement("td");
		multiPrice.innerHTML = Cart.totalArticles[i] * cartItems[i].price/100 + "€";

		row.appendChild(quantity);
		row.appendChild(name);
		row.appendChild(unitPrice);
		row.appendChild(multiPrice);

		table.appendChild(row);



	}

	Payment.updatePrice();

	// Making a order table with all the products
}