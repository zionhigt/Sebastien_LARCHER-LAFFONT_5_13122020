import * as Cv from "./cv.js";
import * as End from "./end.js";
import * as Multi from "./multi.js";

let prevButton = document.getElementById('previousStep');
let submitButton = document.getElementById('nextStep');

export let customer = {
	firstName: "",
	lastName: "",
	address:"",
	city: "",
	email: ""
};
// This customer object will be sent

export function nextCallBack(){

	if(formControl() == 1)
	{
		Cv.showOrderCv();
	}
	// Go to next Step if all is fine
}

export function previousCallBack()
{
	$("#submitOrder").modal('hide');
}

export function formListener()
{
	Multi.showPageView(0);

	submitButton.classList.add("d-block");
	prevButton.classList.add("d-block");

	prevButton.removeEventListener("click", Cv.previousCallBack);
	submitButton.removeEventListener("click", End.nextCallBack);
	submitButton.removeEventListener("click", Cv.nextCallBack);

	submitButton.addEventListener("click", nextCallBack);
	prevButton.addEventListener("click", previousCallBack);
	// Add my event listener and remove the others
}

function formControl()
{
	const firstName = document.getElementById("firstName");
	const lastName = document.getElementById("lastName");
	const address = document.getElementById("address");
	const city = document.getElementById("city");
	const email = document.getElementById("email");
	let values = [firstName, lastName, address, city, email];
	let good = 1;

	customer.firstName = firstName.value;
	customer.lastName = lastName.value;
	customer.address = address.value;
	customer.city = city.value;
	customer.email = email.value;

	for(let i of values)
	{
		if(i.value == "" || typeof(i.value) != "string")
		{
			i.classList.add("unvalable", "bg-warning");
			good = 0;
		}

		i.addEventListener('focus', function(e){
			e.target.classList.remove('unvalable', "bg-warning");
		})
	}
	return good;

	// Check the good form value is here. Add the good into customers object
	// Alert for the bad inputs
}