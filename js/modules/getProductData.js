let dataDownloaded = document.createEvent("event");
dataDownloaded.initEvent("dataisready", true, true);

export let data = [];

export async function productData()
{
	const url = "https://orinoco-cameras.herokuapp.com/api/cameras";

	const response = await fetch(url);
	return response.json();
}

let res = productData().then(function(e){
	if(e.length >= 1)
	{
		data = e;
		document.dispatchEvent(dataDownloaded);
	}
}).catch(function(e){

	console.log("ERREUR: \n" + e);
});

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

