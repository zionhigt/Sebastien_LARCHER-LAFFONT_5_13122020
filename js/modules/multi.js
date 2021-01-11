import * as form from "./form.js";
import * as end from "./end.js";
import * as cart from "./cart.js";
import * as send from "./send.js";



const buttonNextText = ["Valider vos informations", "Ma commande me convient", "Payer", "", "Fermer"];
const buttonPreviousText = ["Fermer", "Modifier vos informations", "Ma commande", ""];
// It is an array fulled with each button's text
let nextStepButton = document.getElementById('nextStep');
let previousStepButton = document.getElementById('previousStep');
let container = document.getElementById('stepContainer');

export function multiStepHandeler()
{
	form.formListener();
	// Init first listener
}


export function showPageView(id)
{
	// Give me an id I'll be able to show the proper chidren of the parent
	switchProgress(id);
	switchButton(id);
	let a = -1;
	for(let i of container.children)
	{
		a++;

		if(a == id)
		{

			i.style.display  = "block";
		}
		else
		{
			i.style.display  = "none";

		}
	}
}

function switchButton(id)
{
	// Be switching to good button
	let nextText = buttonNextText[id];
	let previousText = buttonPreviousText[id];
	
	nextStepButton.innerHTML = nextText;
	previousStepButton.innerHTML = previousText;
}

function switchProgress(id)
{
	// Be switching to good progress icone
	let progressItems = document.getElementById('progressbar');
	let a = -1;
	if(id == 4)
	{
		id = 3;
	}
	for(let i of progressItems.children)
	{
		a++;

		if(a == id)
		{

			i.classList.add('active');
		}
		else
		{

			i.classList.remove('active');
		}
	}
}