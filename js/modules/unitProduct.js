import * as template from "./template.js";



export async function createAProductCard(productData, id)
{
    let content  = await template.getStoreCardFromTemplate(productData, id);
    return content;
    // Give card product when it built off
}
