
//  Building an error window whith dinamic error code and it does redirection on the one where error is from.
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