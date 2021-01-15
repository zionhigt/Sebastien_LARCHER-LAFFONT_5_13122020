let notificationCount = 0;

const settingOfType = {
		"add": {
			"text": " à été ajouté a votre panier !",
			"bg": "bg-success"
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
		"cookies":
		{
			"text": "Ce site utilise les cookies pour améliorer l'expérience utilisateur <br><a class=\"read-more\" href=\"\"> en savoir plus...</a>",
			"bg": "bg-dark"
		}
	};

export function popAlertActionCart(type, text, autoKill=1){
	
	let alertTemplate = document.querySelector('#alertBox');
	let alertTemplateClone = document.importNode(alertTemplate.content, true);

	let container = alertTemplateClone.querySelector('#alertContainer');
	settingId(container, "" + notificationCount);
	container.classList.add('show', settingOfType[type]["bg"]);

	if(type == "cookies")
	{
		container.classList.remove("fixed-top");
		container.classList.add("fixed-bottom");
		container.classList.add("mb-0");
	}


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

	container.style.zIndex = notificationCount*1 + 1050;
	if(autoKill)
	{
		let time = setTimeout(function(){

			container.classList.add('d-none');

		}, 4500);

	}
	return alertTemplateClone;

}

function settingId(element, id)
{
	const lastId = element.id;
	element.setAttribute('id', lastId + "_" + id);
}