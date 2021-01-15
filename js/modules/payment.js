import * as Cart from "./cart.js";
import * as Send from "./send.js";
import * as Multi from "./multi.js";
import * as Cv from "./cv.js";
import * as End from "./end.js";


let submitButton = document.getElementById('nextStep');
let prevButton = document.getElementById('previousStep');
let priceElement = document.getElementById("mainPrice");

export function nextCallBack()
{
	Multi.showPageView(3);

	submitButton.classList.add("d-none");
	prevButton.classList.add("d-none");

	submitButton.classList.remove("d-block");
	prevButton.classList.remove("d-block");

	Send.sendOrder().then(function(e){
		submitButton.classList.add("d-block");
	}).catch(function(er){
		console.log("Erreur lors de la requête : " + er);
	})
}

export function previousCallBack()
{
	Cv.showOrderCv();
}


export function showPayment()
{
	updatePrice();

	Multi.showPageView(2);

	submitButton.removeEventListener("click", Cv.nextCallBack);
	submitButton.removeEventListener("click", End.nextCallBack);
	prevButton.removeEventListener("click", Cv.previousCallBack);

	submitButton.addEventListener("click", nextCallBack);
	prevButton.addEventListener("click", previousCallBack);
	// Add my event listener and remove the others

}

export function updatePrice()
{
	priceElement.innerHTML = Cart.cartTotal + "€";
	// Updating the total price

}