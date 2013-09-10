document.addEventListener('click', textMining, true);

function textMining(eventData){
  var target = eventData.target;
  var innerText = target.innerText;
  alert(innerText);
  //TODO: apply text mining here
};
