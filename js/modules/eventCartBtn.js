
// Event in addition with the native bootstrap modal events

let btnCart = document.querySelector("#cartToggle");
let btnClicked = 0;
let btnPosMobileTopMax = parseInt(window.screen.height - 100);
let btnPosMobileLeft = btnCart.style.left;
let btnCartMovable = 1;


export function initMovedBtnEvent()
{



// Event for the cart button when there is a navigation by mouse.


// When mouse is getting down on cart's button
btnCart.addEventListener("mousedown", function(e){
	btnClicked = 1;
	btnCart.style.transition = "left 0s ease-out";
});
// Cart's button follows mouse moved until mouseup event is happened.
document.addEventListener("mousemove", function(e){
	
	if(btnClicked == 1)
	{
		if(parseInt(e.clientX) < parseInt((window.screen.width - 120)))
		{
			btnCart.style.left = parseInt(e.clientX) + "px";
		}
		else
		{
			btnCart.style.left = parseInt((window.screen.width - 120)) + "px";

		}

		if(parseInt(e.clientY) > 0)
		{
			btnCart.style.top = parseInt(e.clientY) + "px";

		}

		if(parseInt(e.clientY) > parseInt(window.screen.height - 250))
		{
			btnCart.style.top = parseInt(window.screen.height - 250) + "px";

		}

	}
	
});

// When mouse is getting up anywhere
// Cart's button goes at closer side of the screen when mouseup event is sent and it still folows mouse.
document.addEventListener("mouseup", function(e){

	btnCart.style.transition = "left 0.5s ease-out";
	if(btnClicked == 1)
	{
		
		if(parseInt(e.clientX) < parseInt((window.screen.width - 80)/2))
		{

			btnCart.style.left = "0px";
		}

		else
		{
			btnCart.style.left = parseInt((window.screen.width - 80)) + "px";

		}
	}
	btnClicked = 0;
});




// Event for the cart button when there is a navigation by finger or other pointer.

// All this event listeners are an adaptation of the ones are up to "touch" way navigation. 

// Same to mousedown
btnCart.addEventListener("touchstart", function(e){
	btnClicked = 1;
	btnCart.style.transition = "left 0s ease-out";

}, false);

// Same to mouseup
btnCart.addEventListener("touchend", function(e){
	btnCart.style.transition = "left 0.5s ease-out";
	btnClicked = 0;
	btnCart.style.left = btnPosMobileLeft + "px";
}, false);

// Sames to mousemove
btnCart.addEventListener("touchmove", function(e){
	e.preventDefault();
	if(btnClicked == 1)
	{
		if(parseInt(e.touches[0].clientX) < parseInt((window.screen.width - 80)))
		{
			btnCart.style.left = parseInt(e.touches[0].clientX) + "px";
		}
		else
		{
			btnCart.style.left = parseInt((window.screen.width - 80)) + "px";

		}

		if(parseInt(e.touches[0].clientX) < 0)
		{
			btnCart.style.left = "0px";

		}

		if(parseInt(e.touches[0].clientY) > 0)
		{
			btnCart.style.top = parseInt(e.touches[0].clientY) + "px";

		}

		if(parseInt(e.touches[0].clientY) > btnPosMobileTopMax)
		{
			btnCart.style.top = btnPosMobileTopMax + "px";

		}

		if(parseInt(e.touches[0].clientX) < parseInt((window.screen.width - 80)/2))
		{
			btnPosMobileLeft = 0;

		}
		else
		{
			btnPosMobileLeft = parseInt((window.screen.width - 80));

		}

			console.log(btnCart.style.left);


	}
	
}, false);
}