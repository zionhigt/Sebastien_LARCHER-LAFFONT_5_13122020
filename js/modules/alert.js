let notificationCount = 0;
const settingOfType = {
		"add": {
			"text": " à été ajouté a votre panier !",
			"bg": "bg-primary"
		},

		"delete":
		{
			"text": " à été supprimé de votre panier !",
			"bg": "bg-danger" 
		},
		"already":
		{
			"text":" est déjà dans votre panier",
			"bg": "bg-info" 
		},
	};

export function popAlertAddingCart(type, text){
	
	let alertTemplate = document.querySelector('#alertBox');
	let alertTemplateClone = document.importNode(alertTemplate.content, true);

	let container = alertTemplateClone.querySelector('#alertContainer');
	settingId(container, "" + notificationCount);
	container.classList.add('show', settingOfType[type]["bg"]);


	let alertName = alertTemplateClone.querySelector('#alertName');
	settingId(alertName,"" + notificationCount);
	alertName.innerHTML = text;

	let alertMessage = alertTemplateClone.querySelector('#alertMessage');
	settingId(alertMessage,"" + notificationCount);
	alertMessage.innerHTML = settingOfType[type]["text"];

	notificationCount++;
	if(notificationCount > 50)
	{
		notificationCount = 0;
	}

	// container.style.top = notificationCount*30 +"px";
	container.style.zIndex = notificationCount*2 + "";
	let time = setTimeout(function(){

		container.classList.add('d-none');

	}, 4500);

	return alertTemplateClone;

}

function settingId(element, id)
{
	const lastId = element.id;
	element.setAttribute('id', lastId + "_" + id);
}