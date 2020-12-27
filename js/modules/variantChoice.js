export function buildVariantChoice(content, parent){

  let group = parent;
  

  for(let i in content){
    let choiceElement = document.createElement('option');
    choiceElement.setAttribute('value', content[i]);

    choiceElement.classList.add('col-12', 'text-orinoco', 'text-center', 'bg-primary');
    choiceElement.innerHTML = content[i];

    group.appendChild(choiceElement);
  }

  return group;
}