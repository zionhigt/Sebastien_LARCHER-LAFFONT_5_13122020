export async function productData()
{
	const url = "http://192.168.1.113:3001/api/cameras/";

	const response = await fetch(url);
	return response.json();
}

export let data =[];
let res = productData().then(function(e){
	if(e.length >= 1)
	{
		data = e;
		document.querySelector('body').dispatchEvent(dataDownloaded);
	}
}).catch(function(e){

	console.log("ERREUR: \n" + e);
});

let dataDownloaded = document.createEvent("event");
dataDownloaded.initEvent("dataisready", true, true);