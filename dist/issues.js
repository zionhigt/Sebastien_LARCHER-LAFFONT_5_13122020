const locationSearch = window.location.search;

function getIdInURL(param)
{
	let params = new URLSearchParams(locationSearch);

	return params.get(param);
}

document.getElementById("errorCode").innerHTML = getIdInURL("error");

document.getElementById("reload").addEventListener("click", function(){
	window.location = getIdInURL("from");
});