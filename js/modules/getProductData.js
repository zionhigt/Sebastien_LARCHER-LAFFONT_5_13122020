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
			window.location = "./issues.html?error="+ errorCode;
		}
	});
	
}
productData();
// let res = productData().then(function(e){
// 	console.log(JSON.parse(e),"then")
// 	if(e.status == 200)
// 	{
// 		if(e.length >= 1)
// 		{
// 			data = e;
// 			document.dispatchEvent(dataDownloaded);
// 		}
// 	}
// 	else
// 	{
// 		console.log(e.status);
// 	}
// }).catch(function(e){

// 	console.log(e.satus);
// });

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

