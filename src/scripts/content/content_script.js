document.addEventListener('click', textMining, true);

var bayes;

bayes = new classifier.Bayesian();

console.log(json.cats);

bayes.backend.catCounts = json.cats;
bayes.backend.wordCounts = json.words;

function textMining(eventData){
  var target = eventData.target;
  var innerText = target.innerText;

  var cat = bayes.classify(innerText);
  alert(cat + ": " + innerText);

}
