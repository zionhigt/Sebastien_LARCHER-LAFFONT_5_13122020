let dataDownloaded = document.createEvent("event");
dataDownloaded.initEvent("dataisready", true, true);

export let data = [];

export function productData()
{
	const url = "https://orinoco-cameras.herokuapp.com/api/cameras";

	fetch(url).then(function(response){
		if(response.status == 200)
		{
			response.json().then(function(d){

				if(d.length >= 1)
				{
					data = d;

					document.dispatchEvent(dataDownloaded);
				}
			});
		}
		else
		{
			let errorCode = response.status;
			let currentAddress = window.location;
			window.location = "./issues.html?error="+ errorCode+"&from="+currentAddress;
		}
	});
	
}

export function isIdOfProduct(id)
{
	let isOneOfThem = data.map(function(d){return (d._id == id)});
	if(isOneOfThem.indexOf(true) == -1)
	{
		return false;
	}
	else
	{
		return true;
	}
}

productData();
