import * as Multi from "./multi.js";
import * as Payment from "./payment.js";
import * as Form from "./form.js";
import * as Cart from "./cart.js";

let submitButton = document.getElementById("nextStep");

export function nextCallBack(e)
{
	$("#submitOrder").modal("hide");
	$("#cartView").modal("hide");
	// Closing multi window and cart window

	Form.formListener();
	// Returning a the start formulaire with keep the owner informations

}

export function endOfOrder(e)
{
	Multi.showPageView(4);

	document.getElementById("orderNumber").value = e.orderId;

	Cart.getEmpty();
	// Getting an empty cart after end of order

	submitButton.removeEventListener("click", Payment.nextCallBack);
	submitButton.addEventListener("click", nextCallBack);
	// Add my event listener and remove the others


	setTimeout(function(){
		document.querySelector('body').classList.add("modal-open");
		// Waiting for body get ready back to add a modal-open class
	}, 500);
}

