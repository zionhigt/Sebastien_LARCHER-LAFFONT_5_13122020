import * as echo from "./echo.js";

export function building()
{
	const splitedMsg = echo.msg.split("");
	let reverseMsg = [];

	for(let i in splitedMsg)
	{
		reverseMsg.unshift(splitedMsg[i]);
		console.log(splitedMsg[i]);

	}
	return reverseMsg.join("");
}